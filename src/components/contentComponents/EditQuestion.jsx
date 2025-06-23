import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MainInput from "@/components/contentComponents/MainInput";
import SelectInput from "@/components/contentComponents/SelectInput";
import { Edit } from "lucide-react";
import { useUpdateQuestion } from "@/hooks/questionHook";
import { useQuery } from "@tanstack/react-query";
import {
  getQuestionById,
  getPapers,
  getSubjects,
  getModules,
  getsSubModule,
} from "@/api/adminApi";

// Helper to prevent re-running effects on every render
const useIsInitialLoad = () => {
  const isInitialLoad = useState(true)[0];
  return isInitialLoad;
};


const EditQuestion = ({ questionId }) => {
  const { mutate: updateQuestion } = useUpdateQuestion();
  const [open, setOpen] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    text: "",
    img_url: "",
    year: "",
    difficulty: "",
    explanation: "",
    tags: "",
    options: ["", "", "", ""],
    correct_option_index: "",
  });

  // State for selected items in dropdowns
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSubModule, setSelectedSubModule] = useState(null);

  // --- Data Fetching ---
  
  // Fetch the specific question when the dialog opens
  const { data: questionData } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestionById(questionId),
    enabled: open, // Only fetch when the dialog is open
  });

  // Fetch all papers
  const { data: papers = [], isSuccess: papersLoaded } = useQuery({
    queryKey: ["papers"],
    queryFn: getPapers,
    enabled: open,
  });

  // Fetch subjects when a paper is selected
  const { data: subjects = [], isSuccess: subjectsLoaded } = useQuery({
    queryKey: ["subjects", selectedPaper?._id],
    queryFn: () => getSubjects(selectedPaper._id),
    enabled: !!selectedPaper,
  });

  // Fetch modules when a subject is selected
  const { data: modules = [], isSuccess: modulesLoaded } = useQuery({
    queryKey: ["modules", selectedSubject?._id],
    queryFn: () => getModules(selectedSubject._id),
    enabled: !!selectedSubject,
  });

  // Fetch sub-modules when a module is selected
  const { data: submodules = [], isSuccess: submodulesLoaded } = useQuery({
    queryKey: ["submodules", selectedModule?._id],
    queryFn: () => getsSubModule(selectedModule._id),
    enabled: !!selectedModule,
  });

  
  // --- State Initialization Effects ---

  // Effect 1: Populate form with initial question data once it's loaded
  useEffect(() => {
    if (questionData) {
      // 1. Find the index of the correct option
      const correctIndex = questionData.options?.findIndex(
        (opt) => opt._id === questionData.correct_option_id
      );

      // 2. Set the main form data
      setFormData({
        text: questionData.text || "",
        img_url: questionData.img_url || "",
        year: questionData.year || "",
        difficulty: questionData.difficulty || "",
        explanation: questionData.explanation || "",
        tags: Array.isArray(questionData.tags) ? questionData.tags.join(", ") : "",
        options: questionData.options?.map((opt) => opt.option_text) || ["", "", "", ""],
        correct_option_index: correctIndex !== -1 ? correctIndex.toString() : "",
      });

      // 3. Set the first dropdown (Paper)
      if (papersLoaded && questionData.paper_id) {
        const paperToSelect = papers.find(p => p._id === questionData.paper_id);
        if (paperToSelect) setSelectedPaper(paperToSelect);
      }
    }
  }, [questionData, papers, papersLoaded]);

  // Effect 2: Set the Subject dropdown once Subjects are loaded for the selected Paper
  useEffect(() => {
    if (subjectsLoaded && questionData?.subject_id) {
      const subjectToSelect = subjects.find(s => s._id === questionData.subject_id);
      if (subjectToSelect) setSelectedSubject(subjectToSelect);
    }
  }, [subjectsLoaded, subjects, questionData]);

  // Effect 3: Set the Module dropdown
  useEffect(() => {
    if (modulesLoaded && questionData?.module_id) {
      const moduleToSelect = modules.find(m => m._id === questionData.module_id);
      if (moduleToSelect) setSelectedModule(moduleToSelect);
    }
  }, [modulesLoaded, modules, questionData]);

  // Effect 4: Set the Sub-Module dropdown
  useEffect(() => {
    if (submodulesLoaded && questionData?.sub_module_id) {
      const subModuleToSelect = submodules.find(sm => sm._id === questionData.sub_module_id);
      if (subModuleToSelect) setSelectedSubModule(subModuleToSelect);
    }
  }, [submodulesLoaded, submodules, questionData]);


  // --- Event Handlers ---

  // FIX 1: This handler will not trim spaces from the input.
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = () => {
    const dataToSubmit = {
      ...formData,
      paper_id: selectedPaper?._id || null,
      subject_id: selectedSubject?._id || null,
      module_id: selectedModule?._id || null,
      sub_module_id: selectedSubModule?._id || null,
    };
    
    const cleanedData = Object.fromEntries(
      Object.entries(dataToSubmit).filter(([_, v]) => v !== "" && v !== null)
    );

    if (cleanedData.options?.every(opt => opt === "")) {
      delete cleanedData.options;
    }
    
    updateQuestion({ id: questionId, updatedData: cleanedData });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </div>
      </DialogTrigger>
      <DialogContent className="w-full h-screen !max-w-[70vw] flex flex-col justify-start items-start mt-10 overflow-y-scroll">
        <h1 className="text-2xl font-bold mb-4">Edit Question</h1>
        {questionData ? (
          <div className="flex w-full gap-6">
            {/* Left Column */}
            <div className="w-1/2 flex flex-col gap-4">
              <MainInput title="Question" placeholder="Enter question" value={formData.text} onChange={(val) => handleChange("text", val)} />
              <MainInput title="Explanation" placeholder="Explanation" value={formData.explanation} onChange={(val) => handleChange("explanation", val)} />
              <MainInput title="Image URL" placeholder="Image URL" value={formData.img_url} onChange={(val) => handleChange("img_url", val)} />

              {["A", "B", "C", "D"].map((label, idx) => (
                <MainInput
                  key={idx}
                  title={`Option ${label}`}
                  placeholder={`Option ${label}`}
                  value={formData.options[idx]}
                  onChange={(val) => handleOptionChange(idx, val)}
                />
              ))}

              <SelectInput
                title="Correct Option"
                sampleSelectLabel="Select Correct Option"
                options={[
                  { label: "A", value: "0" }, { label: "B", value: "1" },
                  { label: "C", value: "2" }, { label: "D", value: "3" }
                ]}
                value={formData.correct_option_index}
                onChange={(val) => handleChange("correct_option_index", val)}
              />
            </div>

            {/* Right Column */}
            <div className="w-1/2 flex flex-col gap-4">
              <MainInput title="Year" placeholder="2025" value={formData.year} onChange={(val) => handleChange("year", val)} />
              <SelectInput
                title="Difficulty"
                sampleSelectLabel="Select Difficulty"
                options={[{ label: "Easy", value: "Easy" }, { label: "Medium", value: "Medium" }, { label: "Hard", value: "Hard" }]}
                value={formData.difficulty}
                onChange={(val) => handleChange("difficulty", val)}
              />
              <MainInput title="Tags" placeholder="Comma-separated tags" value={formData.tags} onChange={(val) => handleChange("tags", val)} />
              
              <SelectInput
                title="Paper"
                sampleSelectLabel="Select Paper"
                options={papers.map((p) => ({ label: p.name, value: p._id }))}
                value={selectedPaper?._id || ""}
                onChange={(val) => {
                  setSelectedPaper(papers.find(p => p._id === val));
                  setSelectedSubject(null);
                  setSelectedModule(null);
                  setSelectedSubModule(null);
                }}
              />
              <SelectInput
                title="Subject"
                sampleSelectLabel="Select Subject"
                options={subjects.map((s) => ({ label: s.name, value: s._id }))}
                value={selectedSubject?._id || ""}
                onChange={(val) => {
                  setSelectedSubject(subjects.find(s => s._id === val));
                  setSelectedModule(null);
                  setSelectedSubModule(null);
                }}
              />
              <SelectInput
                title="Module"
                sampleSelectLabel="Select Module"
                options={modules.map((m) => ({ label: m.name, value: m._id }))}
                value={selectedModule?._id || ""}
                onChange={(val) => {
                  setSelectedModule(modules.find(m => m._id === val));
                  setSelectedSubModule(null);
                }}
              />
              <SelectInput
                title="Sub Module"
                sampleSelectLabel="Select Sub Module"
                options={submodules.map((sm) => ({ label: sm.name, value: sm._id }))}
                value={selectedSubModule?._id || ""}
                onChange={(val) => setSelectedSubModule(submodules.find(sm => sm._id === val))}
              />
              <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit}>
                Update Question
              </Button>
            </div>
          </div>
        ) : (
          <p>Loading question data...</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestion;