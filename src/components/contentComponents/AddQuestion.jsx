import { useState, useEffect } from "react";
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
import { useQuery } from "@tanstack/react-query";
import {
  getPapers,
  getSubjects,
  getModules,
  getsSubModule,
} from "@/api/adminApi";

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

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);
  const [open, setOpen] = useState(false);

  const { data: papers = [] } = useQuery({
    queryKey: ["papers"],
    queryFn: getPapers,
  });

  const { data: subjects = [] } = useQuery({
    queryKey: ["subjects", selectedPaper?._id],
    queryFn: () => selectedPaper ? getSubjects(selectedPaper._id) : Promise.resolve([]),
    enabled: !!selectedPaper,
  });

  const { data: modules = [] } = useQuery({
    queryKey: ["modules", selectedSubject?._id],
    queryFn: () => selectedSubject ? getModules(selectedSubject._id) : Promise.resolve([]),
    enabled: !!selectedSubject,
  });

  const { data: submodules = [] } = useQuery({
    queryKey: ["submodules", selectedModule?._id],
    queryFn: () => selectedModule ? getsSubModule(selectedModule._id) : Promise.resolve([]),
    enabled: !!selectedModule,
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
    setOpen(false)
  };

  // Sync selected dropdowns with formData
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      paper_id: selectedPaper?._id || "",
      subject_id: selectedSubject?._id || "",
      module_id: selectedModule?._id || "",
      sub_module_id: selectedSubModule?._id || "",
    }));
  }, [selectedPaper, selectedSubject, selectedModule, selectedSubModule]);

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            <SelectInput
              title="Paper"
              sampleSelectLabel="Select Paper"
              options={papers.map(p => ({ label: p.name, value: p._id }))}
              value={selectedPaper?._id || ""}
              onChange={val => {
                const selected = papers.find(p => p._id === val);
                setSelectedPaper(selected);
                setSelectedSubject(null);
                setSelectedModule(null);
                setSelectedSubModule(null);
              }}
            />

            <SelectInput
              title="Subject"
              sampleSelectLabel="Select Subject"
              options={subjects.map(s => ({ label: s.name, value: s._id }))}
              value={selectedSubject?._id || ""}
              onChange={val => {
                const selected = subjects.find(s => s._id === val);
                setSelectedSubject(selected);
                setSelectedModule(null);
                setSelectedSubModule(null);
              }}
            />

            <SelectInput
              title="Module"
              sampleSelectLabel="Select Module"
              options={modules.map(m => ({ label: m.name, value: m._id }))}
              value={selectedModule?._id || ""}
              onChange={val => {
                const selected = modules.find(m => m._id === val);
                setSelectedModule(selected);
                setSelectedSubModule(null);
              }}
            />

            <SelectInput
              title="Sub Module"
              sampleSelectLabel="Select Sub Module"
              options={submodules.map(sm => ({ label: sm.name, value: sm._id }))}
              value={selectedSubModule?._id || ""}
              onChange={val => {
                const selected = submodules.find(sm => sm._id === val);
                setSelectedSubModule(selected);
              }}
            />

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
