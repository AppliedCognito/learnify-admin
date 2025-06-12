import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MainInput from "@/components/contentComponents/MainInput";
import SelectInput from "@/components/contentComponents/SelectInput";
import { Plus } from "lucide-react";
import { useAddQuestion } from "@/hooks/questionHook";

const AddQuestion = () => {
  const { mutate: addQuestion } = useAddQuestion();
  const [formData, setFormData] = useState({
    text: "",
    img_url: "",
    year: "",
    difficulty: "",
    explanation: "",
    tags: "",
    options: ["", "", "", ""],
    correct_option_index: "",
    paper_id: "",
    subject_id: "",
    module_id: "",
    sub_module_id: "",
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = () => {
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== "" && v !== null)
    );
    if (cleanData.options?.every(opt => opt === "")) delete cleanData.options;
    if (cleanData.correct_option_index === "") delete cleanData.correct_option_index;
    addQuestion(cleanData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-black text-white hover:bg-gray-800'>
          <Plus /> Add New Question
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-screen !max-w-[70vw] flex flex-col justify-start items-start mt-10 overflow-y-scroll">
        <h1 className='text-2xl font-bold mb-4'>Add New Question</h1>
        <div className="flex w-full gap-6">
          {/* Left Column */}
          <div className="w-1/2 flex flex-col gap-4">
            <MainInput title="Question" placeholder="Enter question" value={formData.text} onChange={val => handleChange("text", val)} />
            <MainInput title="Explanation" placeholder="Explanation" value={formData.explanation} onChange={val => handleChange("explanation", val)} />
            <MainInput title="Image URL" placeholder="Image URL" value={formData.img_url} onChange={val => handleChange("img_url", val)} />

            {["A", "B", "C", "D"].map((label, idx) => (
              <MainInput
                key={idx}
                title={`Option ${label}`}
                placeholder={`Option ${label}`}
                value={formData.options[idx]}
                onChange={val => handleOptionChange(idx, val)}
              />
            ))}

            <SelectInput
              title="Correct Option"
              sampleSelectLabel="Select Correct Option"
              options={[
                { label: "A", value: "0" },
                { label: "B", value: "1" },
                { label: "C", value: "2" },
                { label: "D", value: "3" }
              ]}
              value={formData.correct_option_index?.toString()}
              onChange={(val) => handleChange("correct_option_index", val)}
            />
          </div>

          {/* Right Column */}
          <div className="w-1/2 flex flex-col gap-4">
            <MainInput title="Year" placeholder="2025" value={formData.year} onChange={val => handleChange("year", parseInt(val))} />
            
            <SelectInput
              title="Difficulty"
              sampleSelectLabel="Select Difficulty"
              options={[
                { label: "Easy", value: "Easy" },
                { label: "Medium", value: "Medium" },
                { label: "Hard", value: "Hard" }
              ]}
              value={formData.difficulty}
              onChange={val => handleChange("difficulty", val)}
            />

            <MainInput title="Tags" placeholder="Comma-separated tags" value={formData.tags} onChange={val => handleChange("tags", val)} />
            <MainInput title="Paper ID" placeholder="paper_id" value={formData.paper_id} onChange={val => handleChange("paper_id", val)} />
            <MainInput title="Subject ID" placeholder="subject_id" value={formData.subject_id} onChange={val => handleChange("subject_id", val)} />
            <MainInput title="Module ID" placeholder="module_id" value={formData.module_id} onChange={val => handleChange("module_id", val)} />
            <MainInput title="Sub Module ID" placeholder="sub_module_id" value={formData.sub_module_id} onChange={val => handleChange("sub_module_id", val)} />

            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestion;
