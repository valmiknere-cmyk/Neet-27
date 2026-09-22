export interface SyllabusChapter {
  id: string;
  name: string;
  subject: 'Physics' | 'Chemistry' | 'Biology';
  classGrade: 11 | 12;
  dayCovered: number;
  totalQuestionsWeightage: string;
}

export const NEET_SYLLABUS_CHAPTERS: SyllabusChapter[] = [
  // Class 11 Physics
  { id: 'p11-1', name: 'Mathematical Tools & Vectors', subject: 'Physics', classGrade: 11, dayCovered: 4, totalQuestionsWeightage: '1-2 Qs' },
  { id: 'p11-2', name: 'Units & Measurements', subject: 'Physics', classGrade: 11, dayCovered: 7, totalQuestionsWeightage: '2 Qs' },
  { id: 'p11-3', name: 'Motion in a Straight Line', subject: 'Physics', classGrade: 11, dayCovered: 11, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'p11-4', name: 'Motion in a Plane (Projectiles & Vectors)', subject: 'Physics', classGrade: 11, dayCovered: 16, totalQuestionsWeightage: '2 Qs' },
  { id: 'p11-5', name: 'Laws of Motion & Friction', subject: 'Physics', classGrade: 11, dayCovered: 24, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'p11-6', name: 'Work, Energy & Power', subject: 'Physics', classGrade: 11, dayCovered: 32, totalQuestionsWeightage: '3 Qs' },
  { id: 'p11-7', name: 'System of Particles & Rotational Motion', subject: 'Physics', classGrade: 11, dayCovered: 42, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'p11-8', name: 'Gravitation', subject: 'Physics', classGrade: 11, dayCovered: 49, totalQuestionsWeightage: '2 Qs' },
  { id: 'p11-9', name: 'Mechanical Properties of Solids', subject: 'Physics', classGrade: 11, dayCovered: 53, totalQuestionsWeightage: '1-2 Qs' },
  { id: 'p11-10', name: 'Mechanical Properties of Fluids', subject: 'Physics', classGrade: 11, dayCovered: 57, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'p11-11', name: 'Thermal Properties of Matter', subject: 'Physics', classGrade: 11, dayCovered: 62, totalQuestionsWeightage: '2 Qs' },
  { id: 'p11-12', name: 'Thermodynamics', subject: 'Physics', classGrade: 11, dayCovered: 66, totalQuestionsWeightage: '3 Qs' },
  { id: 'p11-13', name: 'Kinetic Theory of Gases (KTG)', subject: 'Physics', classGrade: 11, dayCovered: 70, totalQuestionsWeightage: '1-2 Qs' },
  { id: 'p11-14', name: 'Oscillations & SHM', subject: 'Physics', classGrade: 11, dayCovered: 75, totalQuestionsWeightage: '2 Qs' },
  { id: 'p11-15', name: 'Waves & Sound', subject: 'Physics', classGrade: 11, dayCovered: 80, totalQuestionsWeightage: '2-3 Qs' },

  // Class 11 Chemistry
  { id: 'c11-1', name: 'Some Basic Concepts of Chemistry (Mole Concept)', subject: 'Chemistry', classGrade: 11, dayCovered: 7, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'c11-2', name: 'Structure of Atom', subject: 'Chemistry', classGrade: 11, dayCovered: 16, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'c11-3', name: 'Classification of Elements & Periodicity', subject: 'Chemistry', classGrade: 11, dayCovered: 24, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'c11-4', name: 'Chemical Bonding & Molecular Structure', subject: 'Chemistry', classGrade: 11, dayCovered: 34, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'c11-5', name: 'Chemical Thermodynamics', subject: 'Chemistry', classGrade: 11, dayCovered: 44, totalQuestionsWeightage: '3 Qs' },
  { id: 'c11-6', name: 'Chemical & Ionic Equilibrium', subject: 'Chemistry', classGrade: 11, dayCovered: 54, totalQuestionsWeightage: '4 Qs' },
  { id: 'c11-7', name: 'Redox Reactions', subject: 'Chemistry', classGrade: 11, dayCovered: 61, totalQuestionsWeightage: '1-2 Qs' },
  { id: 'c11-8', name: 'Organic Chemistry: Basic Principles & Techniques', subject: 'Chemistry', classGrade: 11, dayCovered: 71, totalQuestionsWeightage: '4 Qs' },
  { id: 'c11-9', name: 'Hydrocarbons (Alkanes, Alkenes, Alkynes, Aromatic)', subject: 'Chemistry', classGrade: 11, dayCovered: 80, totalQuestionsWeightage: '3-4 Qs' },

  // Class 11 Biology
  { id: 'b11-1', name: 'The Living World', subject: 'Biology', classGrade: 11, dayCovered: 3, totalQuestionsWeightage: '1 Q' },
  { id: 'b11-2', name: 'Biological Classification', subject: 'Biology', classGrade: 11, dayCovered: 10, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b11-3', name: 'Plant Kingdom', subject: 'Biology', classGrade: 11, dayCovered: 16, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b11-4', name: 'Animal Kingdom', subject: 'Biology', classGrade: 11, dayCovered: 24, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'b11-5', name: 'Morphology of Flowering Plants', subject: 'Biology', classGrade: 11, dayCovered: 31, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b11-6', name: 'Anatomy of Flowering Plants', subject: 'Biology', classGrade: 11, dayCovered: 38, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'b11-7', name: 'Structural Organisation in Animals (Tissues & Frog)', subject: 'Biology', classGrade: 11, dayCovered: 45, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'b11-8', name: 'Cell: The Unit of Life', subject: 'Biology', classGrade: 11, dayCovered: 53, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'b11-9', name: 'Biomolecules', subject: 'Biology', classGrade: 11, dayCovered: 60, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b11-10', name: 'Cell Cycle and Cell Division', subject: 'Biology', classGrade: 11, dayCovered: 67, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'b11-11', name: 'Photosynthesis in Higher Plants', subject: 'Biology', classGrade: 11, dayCovered: 71, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b11-12', name: 'Respiration in Plants', subject: 'Biology', classGrade: 11, dayCovered: 74, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'b11-13', name: 'Plant Growth & Development', subject: 'Biology', classGrade: 11, dayCovered: 77, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'b11-14', name: 'Breathing & Exchange of Gases', subject: 'Biology', classGrade: 11, dayCovered: 78, totalQuestionsWeightage: '2 Qs' },
  { id: 'b11-15', name: 'Body Fluids & Circulation', subject: 'Biology', classGrade: 11, dayCovered: 79, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'b11-16', name: 'Excretory Products & Elimination', subject: 'Biology', classGrade: 11, dayCovered: 80, totalQuestionsWeightage: '2-3 Qs' },

  // Class 12 Physics
  { id: 'p12-1', name: 'Electric Charges & Fields', subject: 'Physics', classGrade: 12, dayCovered: 89, totalQuestionsWeightage: '3 Qs' },
  { id: 'p12-2', name: 'Electrostatic Potential & Capacitance', subject: 'Physics', classGrade: 12, dayCovered: 97, totalQuestionsWeightage: '3 Qs' },
  { id: 'p12-3', name: 'Current Electricity', subject: 'Physics', classGrade: 12, dayCovered: 106, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'p12-4', name: 'Moving Charges and Magnetism', subject: 'Physics', classGrade: 12, dayCovered: 115, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'p12-5', name: 'Magnetism and Matter', subject: 'Physics', classGrade: 12, dayCovered: 122, totalQuestionsWeightage: '1-2 Qs' },
  { id: 'p12-6', name: 'Electromagnetic Induction', subject: 'Physics', classGrade: 12, dayCovered: 127, totalQuestionsWeightage: '2 Qs' },
  { id: 'p12-7', name: 'Alternating Current', subject: 'Physics', classGrade: 12, dayCovered: 131, totalQuestionsWeightage: '2 Qs' },
  { id: 'p12-8', name: 'Electromagnetic Waves', subject: 'Physics', classGrade: 12, dayCovered: 136, totalQuestionsWeightage: '1-2 Qs' },
  { id: 'p12-9', name: 'Ray Optics and Optical Instruments', subject: 'Physics', classGrade: 12, dayCovered: 146, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'p12-10', name: 'Wave Optics', subject: 'Physics', classGrade: 12, dayCovered: 153, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'p12-11', name: 'Dual Nature of Radiation and Matter', subject: 'Physics', classGrade: 12, dayCovered: 156, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'p12-12', name: 'Atoms & Nuclei', subject: 'Physics', classGrade: 12, dayCovered: 158, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'p12-13', name: 'Semiconductor Electronics', subject: 'Physics', classGrade: 12, dayCovered: 160, totalQuestionsWeightage: '3-4 Qs' },

  // Class 12 Chemistry
  { id: 'c12-1', name: 'Solutions', subject: 'Chemistry', classGrade: 12, dayCovered: 88, totalQuestionsWeightage: '3 Qs' },
  { id: 'c12-2', name: 'Electrochemistry', subject: 'Chemistry', classGrade: 12, dayCovered: 96, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'c12-3', name: 'Chemical Kinetics', subject: 'Chemistry', classGrade: 12, dayCovered: 104, totalQuestionsWeightage: '3 Qs' },
  { id: 'c12-4', name: 'The d- and f-Block Elements', subject: 'Chemistry', classGrade: 12, dayCovered: 112, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'c12-5', name: 'Coordination Compounds', subject: 'Chemistry', classGrade: 12, dayCovered: 120, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'c12-6', name: 'Haloalkanes and Haloarenes', subject: 'Chemistry', classGrade: 12, dayCovered: 128, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'c12-7', name: 'Alcohols, Phenols and Ethers', subject: 'Chemistry', classGrade: 12, dayCovered: 137, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'c12-8', name: 'Aldehydes, Ketones and Carboxylic Acids', subject: 'Chemistry', classGrade: 12, dayCovered: 146, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'c12-9', name: 'Amines (Organic Compounds Containing Nitrogen)', subject: 'Chemistry', classGrade: 12, dayCovered: 153, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'c12-10', name: 'Biomolecules', subject: 'Chemistry', classGrade: 12, dayCovered: 160, totalQuestionsWeightage: '2-3 Qs' },

  // Class 12 Biology
  { id: 'b12-1', name: 'Sexual Reproduction in Flowering Plants', subject: 'Biology', classGrade: 12, dayCovered: 87, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'b12-2', name: 'Human Reproduction', subject: 'Biology', classGrade: 12, dayCovered: 95, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b12-3', name: 'Reproductive Health', subject: 'Biology', classGrade: 12, dayCovered: 101, totalQuestionsWeightage: '2-3 Qs' },
  { id: 'b12-4', name: 'Principles of Inheritance and Variation (Genetics I)', subject: 'Biology', classGrade: 12, dayCovered: 110, totalQuestionsWeightage: '5-6 Qs' },
  { id: 'b12-5', name: 'Molecular Basis of Inheritance (Genetics II)', subject: 'Biology', classGrade: 12, dayCovered: 120, totalQuestionsWeightage: '6-8 Qs' },
  { id: 'b12-6', name: 'Evolution', subject: 'Biology', classGrade: 12, dayCovered: 128, totalQuestionsWeightage: '3 Qs' },
  { id: 'b12-7', name: 'Human Health and Disease', subject: 'Biology', classGrade: 12, dayCovered: 136, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b12-8', name: 'Biotechnology: Principles and Processes', subject: 'Biology', classGrade: 12, dayCovered: 144, totalQuestionsWeightage: '4-5 Qs' },
  { id: 'b12-9', name: 'Biotechnology and its Applications', subject: 'Biology', classGrade: 12, dayCovered: 151, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b12-10', name: 'Organisms and Populations', subject: 'Biology', classGrade: 12, dayCovered: 155, totalQuestionsWeightage: '3 Qs' },
  { id: 'b12-11', name: 'Ecosystem', subject: 'Biology', classGrade: 12, dayCovered: 158, totalQuestionsWeightage: '3-4 Qs' },
  { id: 'b12-12', name: 'Biodiversity and its Conservation', subject: 'Biology', classGrade: 12, dayCovered: 160, totalQuestionsWeightage: '2-3 Qs' },
];
