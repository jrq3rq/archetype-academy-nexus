<!-- [![Carl-XII](https://img.shields.io/badge/-Carl--XII-blue?style=for-the-badge)](https://carl-xii.web.app/) -->

## AI Character Academy

```markdown
v2/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── assets/ // Static files like images, fonts, etc.
│ │ ├── images/
│ │ └── ...
│ ├── components/ // Reusable components
│ │ ├── common/ // Shared components like buttons, sliders
│ │ │ ├── Button.js
│ │ │ ├── Slider.js
│ │ │ └── ...
│ │ ├── portal/ // Components specific to the portal
│ │ │ ├── Dashboard.js
│ │ │ ├── Sidebar.js
│ │ │ └── ...
│ │ ├── character/ // Character-specific components
│ │ │ ├── CharacterCard.js
│ │ │ ├── CharacterView.js
│ │ │ └── ...
│ │ └── ...
│ ├── hooks/ // Custom hooks
│ │ ├── useArchetype.js
│ │ └── ...
│ ├── pages/ // Page components
│ │ ├── HomePage.js
│ │ ├── CharacterPage.js
│ │ └── ...
│ ├── state/ // State management
│ │ ├── context/ // Context API files
│ │ │ ├── ArchetypeContext.js
│ │ │ └── ...
│ │ └── ...
│ ├── services/ // API integration and services
│ │ ├── archetypeService.js
│ │ └── ...
│ ├── utils/ // Utility functions
│ │ ├── helpers.js
│ │ └── ...
│ ├── App.js
│ ├── index.js
│ └── ...
├── tests/ // Test files
│ ├── components/
│ │ └── ...
│ ├── hooks/
│ │ └── ...
│ └── ...
├── docs/ // Documentation
│ ├── API_DOCUMENTATION.md
│ └── ...
├── .env // Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── ...
```

```css
                    [ Carl-XII-v2 ]
                     /     |      \
                    /      |       \
                   /       |        \
  [Character Creation] [Interaction] [Customization]
```

[![ArchetypeAPI](https://img.shields.io/badge/-ArchetypeAPI-orange?style=for-the-badge)](https://us-central1-archetype-builder-api.cloudfunctions.net/api/archetypes)

| **Character Creation** |   **Character Interaction**    | **Character Customization**  |
| :--------------------: | :----------------------------: | :--------------------------: |
| Uses ArchetypeAPI data | Enriched by MindPulse-150 data | Combines data from both APIs |

### Character Creation

- Utilizes data from **ArchetypeAPI**

### Interaction

- Enriched by personality data from **MindPulse-150**

### Customization

- Combines data from **ArchetypeAPI** and insights from **MindPulse-150**
