export const state = () => ({
  teamList: [],
  selectOptions: [],
  teamById: [],
});

export const getters = {
  GET_TEAM_LIST(state) {
    return state.teamList;
  },
  GET_TEAM_SELECT_OPTIONS(state) {
    return state.selectOptions;
  },
  GET_TEAM_BY_ID(state) {
    return state.teamById;
  },
};

export const mutations = {
  SET_TEAM: (state, payload) => {
    state.teamList = payload;
  },
  SET_TEAM_SELECT_OPTIONS: (state, payload) => {
    state.selectOptions = payload;
  },
  SET_TEAM_BY_ID: (state, payload) => {
    state.teamById = payload;
  },
};

export const actions = {
  async addTeam(ctx) {
    try {
      const team = await this.$axios.$post(`${process.env.API_URL}/teams/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (team) {
        ctx.commit("SET_TEAM", team);
        return team;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async setTeamList(ctx) {
    try {
      const team = await this.$axios.$get(
        `${process.env.API_URL}/teams/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (team) {
        ctx.commit("SET_TEAM", team);
        return team;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async setTeamListOptions(ctx) {
    try {
      const teamOptions = await this.$axios.$get(
        `${process.env.API_URL}/teams/select-options`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (teamOptions) {
        ctx.commit("SET_TEAM_SELECT_OPTIONS", teamOptions);
        return teamOptions;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async setTeamById(ctx, payload) {
    try {
      const team = await this.$axios.$get(
        `${process.env.API_URL}/teams/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (team) {
        ctx.commit("SET_TEAM_BY_ID", team);
        return team;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async updateTeamById(ctx, payload) {
    try {
      const team = await this.$axios.$put(
        `${process.env.API_URL}/teams/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (team) {
        ctx.commit("SET_TEAM_BY_ID", team);
        return team;
      }
    } catch (e) {
      console.log(e);
    }
  },
  async deleteTeamById(ctx, payload) {
    try {
      const team = await this.$axios.$put(
        `${process.env.API_URL}/teams/${payload.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (team) {
        ctx.commit("SET_TEAM_BY_ID", team);
        return team;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
