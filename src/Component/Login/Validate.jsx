
export const Validate = state => {
     if (state.firstName && state.email && state.password && state.phone) return true;
     return false;
}