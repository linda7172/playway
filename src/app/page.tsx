import MainForm from '@/components/mainform';
import { Question } from '@/questions';
import { promises as fs } from 'fs';



export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/questions.json', 'utf8');
  const questions = JSON.parse(file) as Question[];

  return (

    <MainForm
      questions={questions}
    />
  );
}
