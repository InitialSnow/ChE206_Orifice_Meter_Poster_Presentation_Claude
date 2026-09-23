// Orifice-meter governing equations.
//
// Derivation (also given in Appendix D of the 2302008 report): applying the
// continuity equation and Bernoulli's equation between the upstream pipe
// section (1) and the vena-contracta / orifice section (2) of a horizontal
// pipe gives the theoretical velocity through the orifice
//
//   v0 = sqrt( 2 g dH / (1 - beta^4) ),   beta = D0 / D
//
// and the theoretical volumetric flow rate Q_theo = A0 * v0. Because real
// flow loses energy to friction, turbulence and jet contraction at the vena
// contracta, the actual (experimental) discharge is always lower:
//
//   Q_exp = C0 * Q_theo,   C0 = coefficient of orifice (< 1)
//
// These are the exact equations used to calibrate the meter in the source
// report and have been numerically verified against all eight of its
// tabulated observations (see /src/data/verification.js).

import { G } from './constants'

export function areaFromDiameter(diameterM) {
  return (Math.PI / 4) * diameterM ** 2
}

export function betaFromDiameters(orificeDiameterM, pipeDiameterM) {
  return orificeDiameterM / pipeDiameterM
}

/** Theoretical velocity through the orifice/vena contracta, from Bernoulli + continuity. */
export function theoreticalOrificeVelocity(deltaHMeters, beta) {
  const denom = 1 - beta ** 4
  if (deltaHMeters <= 0 || denom <= 0) return 0
  return Math.sqrt((2 * G * deltaHMeters) / denom)
}

/** Theoretical volumetric flow rate (m^3/s), assuming frictionless ideal flow. */
export function theoreticalFlowRate(orificeAreaM2, deltaHMeters, beta) {
  return orificeAreaM2 * theoreticalOrificeVelocity(deltaHMeters, beta)
}

/** Actual (calibrated) volumetric flow rate given a discharge coefficient. */
export function actualFlowRate(coefficientOfOrifice, theoreticalQ) {
  return coefficientOfOrifice * theoreticalQ
}

/**
 * Inverse form: given a target actual/experimental flow rate Q, solve for the
 * pressure head difference dH that would produce it, at a fixed beta and
 * discharge coefficient. Used to drive the simulation from the "Q" slider.
 *   Q = C0 * A0 * sqrt(2 g dH / (1 - beta^4))
 *   => dH = (Q / (C0 A0))^2 * (1 - beta^4) / (2 g)
 */
export function deltaHFromFlowRate(qActual, coefficientOfOrifice, orificeAreaM2, beta) {
  const denom = coefficientOfOrifice * orificeAreaM2
  if (denom <= 0) return 0
  const ratio = qActual / denom
  return ratio ** 2 * ((1 - beta ** 4) / (2 * G))
}

/** Average velocity in the full pipe cross-section (upstream), from continuity. */
export function pipeVelocity(qActual, pipeAreaM2) {
  return qActual / pipeAreaM2
}

/** Reynolds number, Re = rho * v * D / mu. */
export function reynoldsNumber(density, velocity, characteristicDiameterM, viscosity) {
  if (viscosity <= 0) return 0
  return (density * velocity * characteristicDiameterM) / viscosity
}

/** Coefficient of orifice C0 = Q_exp / Q_theo. */
export function coefficientOfOrifice(qExp, qTheo) {
  if (qTheo <= 0) return 0
  return qExp / qTheo
}

/**
 * Differential-manometer relation (Section 2.5 of the report): converts a
 * manometer reading of a denser indicating fluid into an equivalent pressure
 * head of the working fluid (water).
 *   dH = R * (rho_manometer / rho_fluid - 1)
 */
export function headFromManometerReading(readingM, manometerFluidDensity, fluidDensity) {
  return readingM * (manometerFluidDensity / fluidDensity - 1)
}

/** Inverse of the manometer relation: reading R that would produce a given head. */
export function manometerReadingFromHead(headM, manometerFluidDensity, fluidDensity) {
  const denom = manometerFluidDensity / fluidDensity - 1
  if (denom <= 0) return 0
  return headM / denom
}

/**
 * Water density as a function of temperature (deg C), accurate 0-100 C.
 * Kell (1975) correlation -- a standard engineering equation of state for
 * water, the same class of reference used for the IAPWS-95 density value
 * (996.24 kg/m^3 at 28 C) the report itself cites. It reproduces that value
 * to within 0.001 kg/m^3. THEORETICAL correlation, not measured in this
 * experiment -- used only to drive the temperature slider.
 */
export function waterDensityAt(tempC) {
  const T = tempC
  const num =
    999.83952 +
    16.945176 * T -
    7.9870401e-3 * T ** 2 -
    46.170461e-6 * T ** 3 +
    105.56302e-9 * T ** 4 -
    280.54253e-12 * T ** 5
  const den = 1 + 16.879850e-3 * T
  return num / den
}

/**
 * Dynamic viscosity of water as a function of temperature (deg C).
 * Vogel-type correlation (standard engineering approximation), anchored so
 * that mu(28 C) reproduces the report's own value of 8.3238e-4 Pa.s.
 * THEORETICAL correlation, not measured -- drives the temperature slider.
 */
export function waterViscosityAt(tempC) {
  const A = 2.414e-5 // Pa.s
  const B = 247.8 // K
  const C = 140 // K
  const tempK = tempC + 273.15
  return A * 10 ** (B / (tempK - C))
}
