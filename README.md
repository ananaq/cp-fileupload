# Using this repo

This repo is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

To get started, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Icons

### Add a new icon

We primarily use Lucide for our icons. To add a new icon, find the icon on https://lucide.dev/icons

```bash
yarn sly add lucide-icons --yes ICON_NAME
```

**Custom icons**

If you need to use an icon outside of Lucide, you can manually add svg's to `src/icons/svg/other` and then run `yarn generate:icons` to generate the icon names.

---

# Navattic Take Home Task

### Overview

The goal of this take-home task is to assess your ability to design and implement a component that aligns with Navattic's design language and technical standards. Specifically, we want to evaluate your proficiency in:

1. Designing a component in Figma using modern standards (e.g., variables, auto layout, component properties) and ensuring it aligns with our existing design system.
2. Producing production-ready code using our stack: Typescript, React, Tailwind, motion.dev, and component primitives (e.g., react-aria, radix, base-ui).

You will create a **`FileUpload` Component** that aligns with our design and development practices. This component will be evaluated on its craft, usability, how well it fits into the existing system, and the quality of its implementation.

This task is a paid, 4 hour task.

---

### Requirements

1. **Design Requirements (Figma):**
   - The component should support **at least two different sizes**:
     - One where it acts as the **primary action on a page**.
     - Another where it is used in a **form layout**.
   - Include **leading information** to help users understand what files are allowed to be uploaded.
   - Design for **single file** and **multiple file** uploads.
   - Consider **UX behaviors**, such as:
     - Allowing users to remove a file after it has been uploaded.
     - Providing feedback during the upload process (e.g., loading indicators).
     - Error states
   - Include a way to **preview uploaded images**, such as company logos. In this instance, only one image would be uploaded and this component would be used for the uploading as well as the previewing of the filled-in data.
   - Ensure the component's **API is consistent** between Figma and the code implementation, creating a denotation system if you need to diverge.
2. **Code Implementation Requirements:**
   - Build the File Upload component using the following stack:
     - **Typescript**
     - **React**
     - **Tailwind CSS**
     - **motion.dev** for animations
     - Suitable **primitives** (e.g., react-aria, radix, base-ui).
   - Ensure the code is **production-ready** and adheres to modern best practices.
   - Use the components and theme provided in our **Compass-UI design system** as a starting point.

---

### Deliverables

1. **Figma File**:
   - Provide a Figma file with the designed File Upload component, demonstrating its various states and sizes. Ensure it aligns with our existing Compass-UI design system.
2. **Code Implementation**:
   - Provide a GitHub repository (or similar) with your implementation of the File Upload component. Include clear instructions on how to run and test the project.
3. **Documentation**:
   - Briefly document the component's API, design decisions, and any trade-offs considered during the implementation.
