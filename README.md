# Lucius Morningstar's Portfolio

This repository contains the source code for Lucius Morningstar's professional portfolio website. The site showcases Lucius's skills, projects, and expertise in various areas of web development and design.

## Table of Contents

- [Repository Structure](#repository-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Wiki](#wiki)

## Repository Structure

```plaintext
lucius-morningstar-portfolio/
├── .github/
│ └── workflows/
│ └── ci-cd.yml
├── src/
│ ├── components/
│ │ ├── Header.js
│ │ ├── Footer.js
│ │ ├── ProjectCard.js
│ │ └── SkillBadge.js
│ ├── pages/
│ │ ├── Home.js
│ │ ├── About.js
│ │ ├── Projects.js
│ │ ├── Skills.js
│ │ └── Contact.js
│ ├── styles/
│ │ ├── global.css
│ │ └── components/
│ │ ├── Header.css
│ │ ├── Footer.css
│ │ ├── ProjectCard.css
│ │ └── SkillBadge.css
│ ├── utils/
│ │ └── api.js
│ └── App.js
├── public/
│ ├── index.html
│ ├── favicon.ico
│ └── images/
│ ├── profile-picture.jpg
│ └── project-thumbnails/
│ ├── project1.jpg
│ ├── project2.jpg
│ └── project3.jpg
├── tests/
│ ├── components/
│ │ ├── Header.test.js
│ │ ├── Footer.test.js
│ │ ├── ProjectCard.test.js
│ │ └── SkillBadge.test.js
│ └── pages/
│ ├── Home.test.js
│ ├── About.test.js
│ ├── Projects.test.js
│ ├── Skills.test.js
│ └── Contact.test.js
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## Technologies Used

- React.js
- HTML5 & CSS3
- JavaScript (ES6+)
- Node.js
- Express.js (for backend API if applicable)
- Jest (for testing)
- GitHub Actions (for CI/CD)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/lucius-morningstar/portfolio.git
   ```

2. Install dependencies:

   ```bash
   cd lucius-morningstar-portfolio
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000` to view the website.

## Features

- Responsive design for optimal viewing on various devices
- Interactive project showcase with detailed information
- Skills section highlighting technical expertise
- Contact form for easy communication
- Smooth animations and transitions for enhanced user experience

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Wiki

For more detailed information about the project, please visit our [Wiki](https://github.com/lucius-morningstar/portfolio/wiki).

- [Home](https://github.com/lucius-morningstar/portfolio/wiki/Home)
- [Project Structure](https://github.com/lucius-morningstar/portfolio/wiki/Project-Structure)
- [Coding Standards](https://github.com/lucius-morningstar/portfolio/wiki/Coding-Standards)
- [Deployment Guide](https://github.com/lucius-morningstar/portfolio/wiki/Deployment-Guide)
- [Troubleshooting](https://github.com/lucius-morningstar/portfolio/wiki/Troubleshooting)