# AI Image Editor 🎨🖼️

This project provides an API endpoint that allows users to upload an image and a text prompt. It then leverages an AI API to edit the image based on the prompt, returning the URL of the edited image. It solves the problem of programmatically editing images using AI with a simple API interface.

## 🚀 Features

- **Image Upload:** Accepts image uploads via `multipart/form-data`.
- **AI-Powered Editing:** Integrates with an AI API to modify images based on text prompts.
- **CDN Storage:** Uploads original images to `cdn.yupra.my.id` for storage and retrieval.
- **Error Handling:** Implements robust error handling to gracefully manage issues during file processing, uploads, and API calls.
- **Asynchronous Operations:** Uses asynchronous functions to handle file uploads and API requests efficiently.
- **Simple API:** Provides a straightforward `/api/edit` endpoint for easy integration.

## 🛠️ Tech Stack

- **Backend:**
    - Node.js
- **Dependencies:**
    - `axios`: For making HTTP requests to the AI API and CDN.
    - `cheerio`: For HTML parsing (potentially used elsewhere in the project).
    - `file-type`: For detecting the file type of uploaded images.
    - `form-data`: For creating `multipart/form-data` streams for file uploads.
    - `multer`: For handling `multipart/form-data` for image uploads.
- **Other:**
    - Vercel (for deployment)

## 📦 Getting Started / Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Fiisya/ai-edit-image
    cd ai-image-editor
    ```

2.  Install dependencies:

    ```bash
    npm install  # or yarn install
    ```

### Running Locally

1.  No local running is available, this is an API endpoint designed to be deployed on serverless functions.
2.  Deploy to Vercel or similar platform.

## 📂 Project Structure

```
ai-image-editor/
├── api/
│   └── edit.js       # API endpoint for image editing
├── package.json      # Project metadata and dependencies
└── README.md         # Project documentation (this file)
```

## 📸 Demo

https://aduhai-fomonye.alfixd.my.id

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request.

## 📝 License

[MIT](LICENSE) (Replace with your project's license file if applicable)

## 📬 Contact

alfixd@gmail.com

## 💖 Thanks

Thank you for checking out this project! We hope it's helpful.

