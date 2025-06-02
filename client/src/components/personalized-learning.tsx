import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Target, Clock, CheckCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  progress: number;
  completed: boolean;
  locked: boolean;
  topics: string[];
}

interface LearningPath {
  name: string;
  description: string;
  modules: LearningModule[];
  totalProgress: number;
}

export default function PersonalizedLearning() {
  const [selectedPath, setSelectedPath] = useState<string>("diamond-basics");

  const learningPaths: Record<string, LearningPath> = {
    "diamond-basics": {
      name: "Diamond Fundamentals",
      description: "Master the essential knowledge of diamond grading and evaluation",
      totalProgress: 65,
      modules: [
        {
          id: "4cs-intro",
          title: "Introduction to the 4Cs",
          description: "Learn the fundamental grading criteria for diamonds",
          difficulty: "Beginner",
          duration: "45 min",
          progress: 100,
          completed: true,
          locked: false,
          topics: ["Carat Weight", "Color Grading", "Clarity Assessment", "Cut Quality"]
        },
        {
          id: "color-grading",
          title: "Advanced Color Grading",
          description: "Deep dive into color evaluation techniques",
          difficulty: "Intermediate",
          duration: "1.5 hours",
          progress: 75,
          completed: false,
          locked: false,
          topics: ["Color Scale", "Lighting Conditions", "Fancy Colors", "Fluorescence Effects"]
        },
        {
          id: "clarity-analysis",
          title: "Clarity Analysis Methods",
          description: "Professional techniques for inclusion identification",
          difficulty: "Intermediate",
          duration: "2 hours",
          progress: 30,
          completed: false,
          locked: false,
          topics: ["Inclusion Types", "Microscopy", "Plotting", "Impact on Value"]
        },
        {
          id: "cut-assessment",
          title: "Cut Quality Assessment",
          description: "Understanding proportions and light performance",
          difficulty: "Advanced",
          duration: "2.5 hours",
          progress: 0,
          completed: false,
          locked: true,
          topics: ["Proportions", "Symmetry", "Polish", "Light Return"]
        }
      ]
    },
    "gemstone-identification": {
      name: "Gemstone Identification",
      description: "Comprehensive guide to identifying and evaluating various gemstones",
      totalProgress: 25,
      modules: [
        {
          id: "gem-properties",
          title: "Physical Properties",
          description: "Understanding hardness, specific gravity, and optical properties",
          difficulty: "Beginner",
          duration: "1 hour",
          progress: 100,
          completed: true,
          locked: false,
          topics: ["Hardness Scale", "Specific Gravity", "Refractive Index", "Pleochroism"]
        },
        {
          id: "testing-methods",
          title: "Testing Methods",
          description: "Hands-on techniques for gemstone identification",
          difficulty: "Intermediate",
          duration: "2 hours",
          progress: 0,
          completed: false,
          locked: false,
          topics: ["Refractometer", "Polariscope", "Spectroscopy", "Chelsea Filter"]
        }
      ]
    }
  };

  const achievements = [
    { name: "First Steps", description: "Completed first module", earned: true },
    { name: "Color Expert", description: "Mastered color grading", earned: true },
    { name: "Detail Oriented", description: "Completed clarity training", earned: false },
    { name: "Cut Master", description: "Advanced cut assessment", earned: false }
  ];

  const currentPath = learningPaths[selectedPath];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Personalized Learning Path</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(learningPaths).map(([key, path]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPath === key 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedPath(key)}
                >
                  <h4 className="font-semibold mb-2">{path.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{path.totalProgress}%</span>
                    </div>
                    <Progress value={path.totalProgress} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">{currentPath.name}</h4>
                <Badge variant="secondary">
                  {currentPath.modules.filter(m => m.completed).length} / {currentPath.modules.length} Complete
                </Badge>
              </div>

              <div className="space-y-3">
                {currentPath.modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${module.locked ? "opacity-60" : "hover:shadow-md"} transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                module.completed 
                                  ? "bg-green-100 text-green-700"
                                  : module.locked 
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-primary/10 text-primary"
                              }`}>
                                {module.completed ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : module.locked ? (
                                  <Lock className="w-4 h-4" />
                                ) : (
                                  <BookOpen className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <h5 className="font-semibold">{module.title}</h5>
                                <p className="text-sm text-muted-foreground">{module.description}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{module.duration}</span>
                              </div>
                              <Badge variant={
                                module.difficulty === "Beginner" ? "secondary" :
                                module.difficulty === "Intermediate" ? "default" : "destructive"
                              } className="text-xs">
                                {module.difficulty}
                              </Badge>
                            </div>

                            {!module.completed && !module.locked && module.progress > 0 && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{module.progress}%</span>
                                </div>
                                <Progress value={module.progress} className="h-1" />
                              </div>
                            )}

                            <div className="mt-3">
                              <div className="flex flex-wrap gap-1">
                                {module.topics.slice(0, 3).map((topic, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                                {module.topics.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{module.topics.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="ml-4">
                            <Button
                              size="sm"
                              disabled={module.locked}
                              variant={module.completed ? "outline" : "default"}
                            >
                              {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Achievements</span>
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border text-center ${
                      achievement.earned 
                        ? "bg-yellow-50 border-yellow-200" 
                        : "bg-gray-50 border-gray-200 opacity-60"
                    }`}
                  >
                    <Award className={`w-6 h-6 mx-auto mb-2 ${
                      achievement.earned ? "text-yellow-600" : "text-gray-400"
                    }`} />
                    <h5 className="text-sm font-semibold">{achievement.name}</h5>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}