const initialState = [
    {
      id: 0,
      name: "Sarosh",
      number: 1234,
      email: "rs@g.com"
    },
    {
      id: 1,
      name: "Fatima",
      number: 12345,
      email: "test@test.com"
    }
  ];
  
  const contactReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        state = [...state, action.payload];
        return state;
      case "UPDATE_CONTACT":
        const updateState = state.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        );
        state = updateState;
        return state;
      default:
        return state;
    }
  };
  
  export default contactReducer;