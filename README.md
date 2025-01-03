# Next.js New Year Bingo App

Welcome to the Next.js New Year Bingo App! This application allows users to play New Year-themed bingo games and includes a special 2024 Recap Bingo feature. The app is built using Next.js and hosted on Firebase for optimal performance and scalability.

## Features

- **New Year Bingo**: Create and play custom New Year-themed bingo games.
- **2024 Recap Bingo**: Reflect on the past year with a specially designed 2024 recap bingo board.
- **Real-time Updates**: Experience live game updates powered by Firebase.
- **Responsive Design**: Enjoy seamless gameplay across various devices and screen sizes.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nextjs-new-year-bingo.git
   cd nextjs-new-year-bingo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Add a web app to your Firebase project
   - Copy the Firebase configuration

4. Create a `.env.local` file in the root directory and add your Firebase config:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment

This app is configured for easy deployment to Firebase Hosting. To deploy:

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize your project:
   ```bash
   firebase init hosting
   ```

4. Build your Next.js app:
   ```bash
   npm run build
   ```

5. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Technologies Used

- Next.js
- React
- Firebase (Hosting, Realtime Database)
- TypeScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Citations:
[1] https://nextjs.org/docs/13/app/building-your-application/configuring/mdx
[2] https://hackernoon.com/the-step-by-step-guide-to-deploying-your-nextjs-app-to-firebase-hosting
[3] https://blog.bolajiayodeji.com/how-to-create-an-automated-profile-readme-using-nodejs-and-github-actions
[4] https://firebase.google.com/docs/hosting/frameworks/nextjs
[5] https://github.com/stanleyfok/nextjs-template/blob/master/README.md
[6] https://dev.to/glennviroux/how-to-deploy-nextjs-to-firebase-18bb
[7] https://fossies.org/linux/next.js/examples/with-magic/README.md
[8] https://github.com/vercel/next.js/blob/canary/packages/create-next-app/README.md
[9] https://stackoverflow.com/questions/72675348/only-readme-md-showing-on-github-pages-when-deploy-nextjs-app
[10] https://dev.to/yuridevat/how-to-create-a-good-readmemd-file-4pa2
