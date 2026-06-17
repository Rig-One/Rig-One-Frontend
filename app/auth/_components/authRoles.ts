export const AUTH_ROLE_OPTIONS = [
  {
    value: "hse-officer",
    label: "HSE Officer",
    description: "Safety oversight, emergency response & incident investigation",
  },
  {
    value: "shift-supervisor",
    label: "Shift Supervisor",
    description: "Shift operations & workforce coordination",
  },
  {
    value: "welfare-campboss",
    label: "Welfare / Campboss",
    description: "Feeding coordination & welfare logistics",
  },
  {
    value: "opm-toolpusher",
    label: "OPM / Toolpusher",
    description: "Overall operational oversight & decision-making",
  },
] as const;
