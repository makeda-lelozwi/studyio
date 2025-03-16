/* eslint-disable @typescript-eslint/no-unused-vars */
interface HomePageProps {
  id: number;
  title: string;
  description:string;
}

interface UserData {
  authToken:string; //jwt
  userName:string;
  isLoggedIn:boolean;
}
