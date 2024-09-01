import React, { createContext, useReducer, useEffect } from "react";

const ChatbotContext = createContext();

const parseJSON = (item) => {
  try {
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

const initialState = {
  messages: parseJSON(localStorage.getItem("chatbotMessages")) || [
    {
      sender: "Archédex",
      content: "Welcome! Please select an archetype to begin.",
      color: "#2f3136",
      textColor: "#ffffff",
    },
  ],
  selectedArchetype: parseJSON(localStorage.getItem("selectedArchetype")) || "",
  selectedColor: localStorage.getItem("selectedColor") || "#282b30",
  traitValues: parseJSON(localStorage.getItem("traitValues")) || {
    intelligence: 0.5,
    creativity: 0.5,
    EQ: 0.5,
    motivation: 0.5,
    confidence: 0.5,
    empathy: 0.5,
  },
  categorySelections: parseJSON(localStorage.getItem("categorySelections")) || {
    coreTraits: "",
    motivationsAndGoals: "",
    abilitiesAndSkills: "",
    talentsAndExpertise: "",
  },
  selectedCategory: localStorage.getItem("selectedCategory") || "",
  archetypes: [], // Initialize archetypes as an empty array
};

const chatbotReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_ARCHETYPE":
      return {
        ...state,
        selectedArchetype: action.payload,
      };
    case "SET_SELECTED_COLOR":
      return {
        ...state,
        selectedColor: action.payload,
      };
    case "SET_TRAIT_VALUES":
      return {
        ...state,
        traitValues: { ...state.traitValues, ...action.payload },
      };
    case "SET_CATEGORY_SELECTIONS":
      return {
        ...state,
        categorySelections: { ...state.categorySelections, ...action.payload },
      };
    case "SET_SELECTED_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "SET_ARCHETYPES":
      return {
        ...state,
        archetypes: action.payload,
      };
    case "CLEAR_CHAT":
      return {
        ...state,
        messages: [
          {
            sender: "Archédex",
            content: "Welcome! Please select an archetype to begin.",
            color: "#2f3136",
            textColor: "#ffffff",
          },
        ],
        selectedArchetype: "",
        selectedColor: "#282b30",
        traitValues: {
          intelligence: 0.5,
          creativity: 0.5,
          EQ: 0.5,
          motivation: 0.5,
          confidence: 0.5,
          empathy: 0.5,
        },
        categorySelections: {
          coreTraits: "",
          motivationsAndGoals: "",
          abilitiesAndSkills: "",
          talentsAndExpertise: "",
        },
        selectedCategory: "",
      };
    default:
      return state;
  }
};

export const ChatbotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(state.messages));
    localStorage.setItem(
      "selectedArchetype",
      JSON.stringify(state.selectedArchetype)
    );
    localStorage.setItem("selectedColor", state.selectedColor);
    localStorage.setItem("traitValues", JSON.stringify(state.traitValues));
    localStorage.setItem(
      "categorySelections",
      JSON.stringify(state.categorySelections)
    );
    localStorage.setItem("selectedCategory", state.selectedCategory);
  }, [state]);

  return (
    <ChatbotContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export default ChatbotContext;
