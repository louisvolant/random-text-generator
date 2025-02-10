# Public-Domain Text Examples
This project provides random text excerpts from public-domain books in multiple languages, serving as an alternative to the classic Lorem Ipsum. It is built using ReactJS, NextJS, and Tailwind CSS.

## Features
- Fetch random text excerpts in multiple languages (English, Spanish, French, German, Italian, Portuguese).
- Copy text to the clipboard with a single click.
- Dynamic language switching.
- Responsive design using Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
Clone the repository:

```bash
git clone https://github.com/your-username/public-domain-text-examples.git
```
Navigate to the project directory:

```bash
cd public-domain-text-examples
```
Install dependencies:

```bash
npm install
```
### Running the Project
Start the development server:

```bash
npm run dev
```
Open your browser and navigate to http://localhost:3000.

### Building the Project
To build the project for production:

```bash
npm run build
```
Start the production server:

```bash
npm start
```

### Type Checking
Before pushing your changes, it's recommended to run type checking to catch any TypeScript errors:

```bash
npm run build
# then
npx tsc --noEmit
# or
node --no-warnings node_modules/.bin/tsc --noEmit
# or
npx --no-warnings tsc --noEmit
```