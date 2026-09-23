// All experimental values below are transcribed from the long report submitted
// by Irfan Uddin Mazumder, Student ID 2302008 (Section A-1, Lab Group 02),
// ChE 206: Chemical Engineering Laboratory I, Department of Chemical
// Engineering, BUET. Experiment performed 25/07/2026.
export const EXPERIMENT_META = {
  title: 'Calibration of Orifice Meter',
  courseCode: 'ChE 206',
  courseName: 'Chemical Engineering Laboratory I',
  department: 'Department of Chemical Engineering',
  university: 'Bangladesh University of Engineering and Technology (BUET)',
  experimentNo: '05',
  instructor: 'Mahmud Hayet Rudro, Lecturer, Department of Chemical Engineering, BUET',
  submittedBy: 'Irfan Uddin Mazumder',
  studentId: '2302008',
  section: 'A-1',
  labGroup: '02',
  dateOfPerformance: '25/07/2026',
  dateOfSubmission: '15/08/2026',
  labPartners: [
    'Samsuddin Ahmed (2302006)',
    'Sanjana Hossain Priatee (2302007)',
    'Md. Mahfuj Hossain Sifat (2302009)',
    'Md. Abrar Hossain Arko (2302010)',
  ],
}

export const G = 9.81 // m/s^2

// Apparatus geometry (Appendix A/B of 2302008's report)
export const ORIFICE_DIAMETER_M = 0.0254 // 1 inch
export const PIPE_DIAMETER_M = 0.0525 // 2.067 inch, Schedule 40
export const BETA_EXPERIMENTAL = ORIFICE_DIAMETER_M / PIPE_DIAMETER_M // ~0.484

// Fluid properties recorded during the experiment.
// Room temperature 29.5 C, water temperature 28 C (Appendix A).
// NOTE: the source report prints the water viscosity as "0.0083238 Pa.s".
// Back-solving the report's own Reynolds-number column (Re = rho*v*D/mu)
// against its own velocity data only reproduces the reported Re values with
// mu = 8.3238e-4 Pa.s (i.e. one decimal place was lost when the report's
// exponent formatting round-tripped through export). We use the
// dimensionally-consistent value; see /src/data/verification.js.
export const WATER_TEMP_C = 28
export const WATER_DENSITY_KGM3 = 996.24 // Wagner & Pruss, IAPWS-95, at 28 C
export const WATER_VISCOSITY_PAS = 8.3238e-4 // Pa.s, at 28 C

export const ROOM_TEMP_C = 29.5
export const CCL4_DENSITY_KGM3 = 1575.71 // Perry's Handbook, at 29.5 C

// Experimental calibration table (Table 1 / Table 3 / Table 4 of the report).
// Q columns are stored in m^3/s (report tabulates them as "x10^-4 m^3/s").
export const EXPERIMENTAL_DATA = [
  { obs: 1, qExp: 4.21e-4, deltaH: 0.058, sqrtDeltaH: 0.24, cd: 0.756, re: 12216, v: 0.194, qTheo: 5.56e-4, manometerR: 0.100 },
  { obs: 2, qExp: 5.18e-4, deltaH: 0.081, sqrtDeltaH: 0.28, cd: 0.789, re: 15024, v: 0.239, qTheo: 6.56e-4, manometerR: 0.139 },
  { obs: 3, qExp: 5.73e-4, deltaH: 0.098, sqrtDeltaH: 0.31, cd: 0.795, re: 16644, v: 0.265, qTheo: 7.21e-4, manometerR: 0.168 },
  { obs: 4, qExp: 5.79e-4, deltaH: 0.112, sqrtDeltaH: 0.33, cd: 0.751, re: 16817, v: 0.268, qTheo: 7.71e-4, manometerR: 0.192 },
  { obs: 5, qExp: 6.69e-4, deltaH: 0.129, sqrtDeltaH: 0.36, cd: 0.807, re: 19429, v: 0.309, qTheo: 8.29e-4, manometerR: 0.222 },
  { obs: 6, qExp: 6.75e-4, deltaH: 0.151, sqrtDeltaH: 0.39, cd: 0.752, re: 19586, v: 0.312, qTheo: 8.97e-4, manometerR: 0.260 },
  { obs: 7, qExp: 6.99e-4, deltaH: 0.159, sqrtDeltaH: 0.40, cd: 0.759, re: 20298, v: 0.323, qTheo: 9.21e-4, manometerR: 0.274 },
  { obs: 8, qExp: 7.41e-4, deltaH: 0.175, sqrtDeltaH: 0.42, cd: 0.767, re: 21501, v: 0.342, qTheo: 9.65e-4, manometerR: 0.301 },
]

const cdValues = EXPERIMENTAL_DATA.map((d) => d.cd)
export const CD_AVERAGE = cdValues.reduce((a, b) => a + b, 0) / cdValues.length
export const CD_MIN = Math.min(...cdValues)
export const CD_MAX = Math.max(...cdValues)

export const Q_EXPERIMENTAL_MIN = Math.min(...EXPERIMENTAL_DATA.map((d) => d.qExp))
export const Q_EXPERIMENTAL_MAX = Math.max(...EXPERIMENTAL_DATA.map((d) => d.qExp))

// Simulation slider ranges (extended a little beyond the tested range so the
// interactive tool remains a general teaching model, not just a replay of
// the eight measured points).
export const Q_SLIDER_MIN = 2.0e-4 // m^3/s (0.20 L/s)
export const Q_SLIDER_MAX = 9.0e-4 // m^3/s (0.90 L/s)
export const BETA_SLIDER_MIN = 0.2
export const BETA_SLIDER_MAX = 0.75
export const TEMP_SLIDER_MIN = 15 // C
export const TEMP_SLIDER_MAX = 45 // C

// Typical literature value for the contraction coefficient of a sharp-edged
// concentric orifice (Miller, "Flow Measurement Engineering Handbook"; Crane
// TP-410). This is NOT measured in the 2302008 report, which reports only a
// combined discharge coefficient C0 = Q_exp / Q_theo. Used here only to
// animate the vena-contracta geometry -- a visual approximation, not data.
export const TYPICAL_CONTRACTION_COEFFICIENT = 0.62

// Reynolds number above which flow is considered fully turbulent for orifice
// calibration purposes (standard rule of thumb cited in the report, Re > 4000).
export const RE_TURBULENT_THRESHOLD = 4000
