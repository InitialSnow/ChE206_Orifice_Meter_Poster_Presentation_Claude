// Ties the governing equations to live user-controlled input (Q, beta, T)
// and derives every quantity the UI displays or animates.
import {
  areaFromDiameter,
  theoreticalOrificeVelocity,
  deltaHFromFlowRate,
  pipeVelocity,
  reynoldsNumber,
  waterDensityAt,
  waterViscosityAt,
  manometerReadingFromHead,
} from './equations'
import {
  PIPE_DIAMETER_M,
  CD_AVERAGE,
  TYPICAL_CONTRACTION_COEFFICIENT,
  RE_TURBULENT_THRESHOLD,
  CCL4_DENSITY_KGM3,
} from './constants'

/**
 * @param {number} qActual   volumetric flow rate, m^3/s (user slider)
 * @param {number} beta      orifice/pipe diameter ratio, d/D (user slider)
 * @param {number} tempC     water temperature, deg C (user slider)
 */
export function computeSimulationState(qActual, beta, tempC) {
  const pipeDiameter = PIPE_DIAMETER_M
  const orificeDiameter = beta * pipeDiameter
  const pipeArea = areaFromDiameter(pipeDiameter)
  const orificeArea = areaFromDiameter(orificeDiameter)

  const density = waterDensityAt(tempC)
  const viscosity = waterViscosityAt(tempC)

  // Calibrated model: hold C0 at the experimental average from 2302008's
  // report (fully turbulent regime, where C0 is essentially constant) and
  // solve for the pressure head that would produce the requested Q.
  const deltaH = deltaHFromFlowRate(qActual, CD_AVERAGE, orificeArea, beta)
  const v0Theoretical = theoreticalOrificeVelocity(deltaH, beta)
  const orificeVelocity = qActual / (TYPICAL_CONTRACTION_COEFFICIENT * orificeArea)
  const pipeVel = pipeVelocity(qActual, pipeArea)
  const reynolds = reynoldsNumber(density, pipeVel, pipeDiameter, viscosity)
  const isTurbulent = reynolds >= RE_TURBULENT_THRESHOLD

  // Vena-contracta geometry (visual approximation, see constants.js).
  const venaContractaDiameter = TYPICAL_CONTRACTION_COEFFICIENT * orificeDiameter
  // Empirical rule of thumb (Miller, Flow Measurement Engineering Handbook):
  // the vena contracta sits roughly 0.5-1.0 pipe diameters downstream of a
  // sharp-edged orifice, moving further downstream as beta decreases.
  const venaContractaDistanceFromPlate = pipeDiameter * (1.0 - 0.6 * beta)

  const manometerReading = manometerReadingFromHead(deltaH, CCL4_DENSITY_KGM3, density)

  return {
    pipeDiameter,
    orificeDiameter,
    pipeArea,
    orificeArea,
    beta,
    density,
    viscosity,
    tempC,
    deltaH,
    v0Theoretical,
    orificeVelocity,
    pipeVelocity: pipeVel,
    reynolds,
    isTurbulent,
    coefficientOfOrifice: CD_AVERAGE,
    venaContractaDiameter,
    venaContractaDistanceFromPlate,
    manometerReading,
    qActual,
  }
}

/**
 * Sampled pressure-head profile along the pipe axis, for the "Pressure Head
 * vs Axial Position" chart. Positions are in units of pipe diameters (x/D),
 * with the orifice plate at x/D = 0. This is a smooth, qualitative model
 * (not a CFD solution): pressure is ~constant upstream, drops sharply across
 * the plate, reaches its minimum at the vena contracta, then partially
 * recovers downstream as the jet re-expands (permanent head loss = 1 - C0^2
 * fraction of the drop is not recovered, consistent with Section 2.2 of the
 * report). Provided as a VISUAL APPROXIMATION for teaching, not measured data.
 */
export function pressureHeadProfile(simState, samples = 60) {
  const { deltaH, venaContractaDistanceFromPlate, pipeDiameter, coefficientOfOrifice } = simState
  const vcX = venaContractaDistanceFromPlate / pipeDiameter
  const recoveryFraction = coefficientOfOrifice ** 2 // fraction of head permanently lost
  const points = []
  const xMin = -3
  const xMax = 6
  for (let i = 0; i <= samples; i++) {
    const x = xMin + ((xMax - xMin) * i) / samples
    let headDropFraction
    if (x <= 0) {
      // Upstream: essentially constant, tiny gradual acceleration.
      headDropFraction = 0
    } else if (x <= vcX) {
      // Sharp drop from plate to vena contracta (smoothstep).
      const t = vcX <= 0 ? 1 : x / vcX
      headDropFraction = t * t * (3 - 2 * t)
    } else {
      // Downstream recovery toward the permanent-loss plateau.
      const recoverySpan = 5
      const t = Math.min(1, (x - vcX) / recoverySpan)
      const eased = t * t * (3 - 2 * t)
      const permanentLossFraction = 1 - recoveryFraction
      headDropFraction = 1 - eased * (1 - permanentLossFraction)
    }
    points.push({ x, head: -deltaH * headDropFraction })
  }
  return points
}
