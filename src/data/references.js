// References exactly as cited in the 2302008 long report (Reference section,
// p.13), reformatted into structured fields for display. Reference [1]'s
// original citation was a raw Google Images search URL rather than a proper
// citation -- reproduced faithfully below with that noted, rather than
// inventing a cleaner source.
export const REFERENCES = [
  {
    id: 1,
    authors: 'eclass.upatras.gr',
    title: 'Orifice Plate (schematic diagram source, Figure 1)',
    source: 'University of Patras eClass',
    year: '2026',
    url: 'https://eclass.upatras.gr/',
    note: 'Cited in the source report as a Google Images result linking to this domain; the original deep link could not be resolved to a stable document.',
    placeholder: true,
  },
  {
    id: 2,
    authors: 'W. L. McCabe, J. C. Smith, and P. Harriott',
    title: 'Unit Operations of Chemical Engineering',
    source: 'McGraw-Hill',
    year: '2005',
  },
  {
    id: 3,
    authors: 'E. Staff',
    title: 'Types of Orifice Plates & Orifice Plate Tappings',
    source: 'Inst Tools',
    year: '2026',
    url: 'https://instrumentationtools.com/types-of-orifice-plates-orifice-plate-tappings/',
    accessed: 'Aug. 15, 2026',
  },
  {
    id: 4,
    authors: 'W. Wagner and A. Pruss',
    title:
      'The IAPWS Formulation 1995 for the Thermodynamic Properties of Ordinary Water Substance for General and Scientific Use',
    source: 'J. Phys. Chem. Ref. Data, vol. 31, no. 2, pp. 387-535',
    year: '2002',
    doi: '10.1063/1.1461829',
  },
  {
    id: 5,
    authors: 'D. W. Green and R. H. Perry',
    title: "Perry's Chemical Engineers' Handbook",
    source: 'McGraw Hill Professional, Eighth Edition',
    year: '2007',
  },
]

// Additional supporting references used specifically for the interactive
// simulation's teaching approximations (vena-contracta geometry, viscosity
// correlation) that go beyond what 2302008's report itself cites -- kept
// separate and clearly labelled so the two provenances are never conflated.
export const SIMULATION_REFERENCES = [
  {
    id: 'S1',
    authors: 'R. W. Miller',
    title: 'Flow Measurement Engineering Handbook',
    source: 'McGraw-Hill, 3rd Edition',
    year: '1996',
    note: 'Basis for the typical sharp-edged-orifice contraction coefficient (Cc ~ 0.62) and vena-contracta location used in the simulation visualization.',
  },
  {
    id: 'S2',
    authors: 'C. R. Wilke and P. Chang (correlation form); Reid, Prausnitz & Poling',
    title: 'The Properties of Gases and Liquids',
    source: 'McGraw-Hill, 4th Edition',
    year: '1987',
    note: 'Basis for the Vogel-type water viscosity vs. temperature correlation used to drive the temperature slider.',
  },
]
