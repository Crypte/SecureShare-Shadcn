import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Faq = () => {

  const questionsAndAnswers = [
    {
      question: "Comment sont sélectionné les outils ?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "Le site génère t-il des revenus ?",
      answer: "You can install React by using npm or yarn.",
    },
    {
      question: "Comment puis-je proposer mon outil à votre plateforme ?",
      answer: "You can install React by using npm or yarn.",
    },
    {
      question: "Puis-je faire une donation ? ",
      answer: "You can install React by using npm or yarn.",
    }
    // Add more questions and answers as needed.
  ];
  
  return (
    <div className="space-y-4">
      {questionsAndAnswers.map((qa, index) => {
        return (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value={`${index + 1}`}>
              <AccordionTrigger>{qa.question}</AccordionTrigger>
            <AccordionContent>
              {qa.answer}
              </AccordionContent>
          </AccordionItem>
        </Accordion>
        );
      })}
    </div>
  );
};
