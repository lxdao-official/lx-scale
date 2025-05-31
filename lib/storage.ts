const STORAGE_KEY = 'questionnaire_draft';

export function saveDraft(questionnaireType: string, answers: { [key: number]: string }) {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    drafts[questionnaireType] = {
      answers,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('保存草稿失败:', error);
    return false;
  }
}

export function loadDraft(questionnaireType: string): { [key: number]: string } | null {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return drafts[questionnaireType]?.answers || null;
  } catch (error) {
    console.error('加载草稿失败:', error);
    return null;
  }
}

export function clearDraft(questionnaireType: string) {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (drafts[questionnaireType]) {
      delete drafts[questionnaireType];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    }
    return true;
  } catch (error) {
    console.error('清除草稿失败:', error);
    return false;
  }
}
