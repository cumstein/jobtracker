
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1>New Project</h1>
      <p className="text-gray-600">This is a new project using Next.js and Tailwind CSS.</p>
      <Button className="bg-blue-500 mt-2">ShadCN</Button> 
    </div>
  );
}
