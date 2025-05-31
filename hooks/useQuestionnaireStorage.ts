import { useState, useEffect } from 'react';

interface QuestionnaireData {
  id: string;
  title: string;
  answers: { [key: number]: string };
  completedAt: string;
  results?: any; // 可以根据需要更具体的类型
}

export function useQuestionnaireStorage(questionnaireId: string) {
  const STORAGE_KEY = 'questionnaire_responses';
  const [savedData, setSavedData] = useState<QuestionnaireData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 从本地存储加载数据
  useEffect(() => {
    try {
      const savedQuestionnaires = localStorage.getItem(STORAGE_KEY);
      if (savedQuestionnaires) {
        const parsedData = JSON.parse(savedQuestionnaires);
        const questionnaireData = parsedData[questionnaireId];
        if (questionnaireData) {
          setSavedData(questionnaireData);
        }
      }
    } catch (error) {
      console.error('Failed to load questionnaire data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [questionnaireId]);

  // 保存问卷数据到本地存储
  const saveQuestionnaireData = async (
    title: string,
    answers: { [key: number]: string },
    results?: any
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const savedQuestionnaires = localStorage.getItem(STORAGE_KEY);
        const allData = savedQuestionnaires ? JSON.parse(savedQuestionnaires) : {};
        
        const newData: QuestionnaireData = {
          id: questionnaireId,
          title,
          answers,
          results,
          completedAt: new Date().toISOString(),
        };

        allData[questionnaireId] = newData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
        setSavedData(newData);
        resolve(true);
      } catch (error) {
        console.error('Failed to save questionnaire data:', error);
        resolve(false);
      }
    });
  };

  // 删除保存的问卷数据
  const deleteQuestionnaireData = () => {
    try {
      const savedQuestionnaires = localStorage.getItem(STORAGE_KEY);
      if (savedQuestionnaires) {
        const allData = JSON.parse(savedQuestionnaires);
        if (allData[questionnaireId]) {
          delete allData[questionnaireId];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
          setSavedData(null);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to delete questionnaire data:', error);
      return false;
    }
  };

  // 获取所有已保存的问卷
  const getAllSavedQuestionnaires = () => {
    try {
      const savedQuestionnaires = localStorage.getItem(STORAGE_KEY);
      return savedQuestionnaires ? JSON.parse(savedQuestionnaires) : {};
    } catch (error) {
      console.error('Failed to get all saved questionnaires:', error);
      return {};
    }
  };

  return {
    savedData,
    isLoading,
    saveQuestionnaireData,
    deleteQuestionnaireData,
    getAllSavedQuestionnaires,
  };
}
