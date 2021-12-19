export const routes = {
  reposDetails: {
    mask: "/repos",
    create: (id: string): string => `/repos/${id}`,
  },
};
