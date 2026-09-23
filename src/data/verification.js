// Sanity check: replays the governing equations in /src/simulation/equations.js
// against every observation in the 2302008 report's own data table and
// confirms the model reproduces the report's tabulated Re and C0 values.
// Not part of the UI -- run manually in a browser console via
// `import('./data/verification.js').then(m => m.verifyModel())` during
// development if the constants are ever revised.
import {
  areaFromDiameter,
  betaFromDiameters,
  theoreticalOrificeVelocity,
  pipeVelocity,
  reynoldsNumber,
  coefficientOfOrifice,
} from '../simulation/equations'
import {
  EXPERIMENTAL_DATA,
  ORIFICE_DIAMETER_M,
  PIPE_DIAMETER_M,
  WATER_DENSITY_KGM3,
  WATER_VISCOSITY_PAS,
} from '../simulation/constants'

export function verifyModel() {
  const A0 = areaFromDiameter(ORIFICE_DIAMETER_M)
  const A = areaFromDiameter(PIPE_DIAMETER_M)
  const beta = betaFromDiameters(ORIFICE_DIAMETER_M, PIPE_DIAMETER_M)

  return EXPERIMENTAL_DATA.map((row) => {
    const v0 = theoreticalOrificeVelocity(row.deltaH, beta)
    const qTheoModel = A0 * v0
    const vPipeModel = pipeVelocity(row.qExp, A)
    const reModel = reynoldsNumber(WATER_DENSITY_KGM3, vPipeModel, PIPE_DIAMETER_M, WATER_VISCOSITY_PAS)
    const cdModel = coefficientOfOrifice(row.qExp, qTheoModel)
    return {
      obs: row.obs,
      reReported: row.re,
      reModel: Math.round(reModel),
      cdReported: row.cd,
      cdModel: Number(cdModel.toFixed(3)),
    }
  })
}
