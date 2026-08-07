import FileUploadComponent from './components/file-upload';
import ChatComponent from './components/chat';
export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-slate-950 text-white">
      <div className="min-h-screen w-screen flex">
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center bg-slate-900 border-r border-slate-700">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] min-h-screen bg-slate-950">
          <ChatComponent />
        </div>
      </div>
    </div>
  );
}