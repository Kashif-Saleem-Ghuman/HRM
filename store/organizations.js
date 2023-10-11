export const state = () => ({
  organizationId: null,
});

export const getters = {
  organizationId(state) {
    return state.organizationId;
  },
};

export const mutations = {
  SET_ORGANIZATION_ID: (state, payload) => {
    const { organizationId } = payload;
    state.organizationId = organizationId;
  },
};

export const actions = {};
