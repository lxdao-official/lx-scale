const STORAGE_KEY = 'questionnaire';

export function save(usage: string, questionnaireType: string, answers: { [key: number]: string }) {
  try {
    const drafts = JSON.parse(localStorage.getItem(`${STORAGE_KEY}_${usage}`) || '{}');
    drafts[questionnaireType] = {
      answers,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(`${STORAGE_KEY}_${usage}`, JSON.stringify(drafts));
    return true;
  } catch (error) {
    console.error('Failed to save draft:', error);
    return false;
  }
}

export function load(usage: string, questionnaireType: string): { [key: number]: string } | null {
  try {
    const drafts = JSON.parse(localStorage.getItem(`${STORAGE_KEY}_${usage}`) || '{}');
    return drafts[questionnaireType]?.answers || null;
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}

export function clear(usage: string, questionnaireType: string) {
  try {
    const key = `${STORAGE_KEY}_${usage}`;
    const drafts = JSON.parse(localStorage.getItem(key) || '{}');

    // If the questionnaire draft doesn't exist, return false directly
    if (!(questionnaireType in drafts)) {
      return false;
    }

    delete drafts[questionnaireType];

    // If there are no more drafts, remove the entire entry; otherwise write back remaining drafts
    if (Object.keys(drafts).length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(drafts));
    }

    return true;
  } catch (error) {
    console.error('Failed to clear draft:', error);
    return false;
  }
}


export function saveDraft(questionnaireType: string, answers: { [key: number]: string }) {
  return save('draft', questionnaireType, answers);
}

export function loadDraft(questionnaireType: string): { [key: number]: string } | null {
  return load('draft', questionnaireType);
}

export function clearDraft(questionnaireType: string) {
  return clear('draft', questionnaireType);
}



export function saveResult(questionnaireType: string, answers: { [key: number]: string }) {
  return save('result', questionnaireType, answers);
}

export function loadResult(questionnaireType: string): { [key: number]: string } | null {
  return load('result', questionnaireType);
}

export function clearResult(questionnaireType: string) {
  return clear('result', questionnaireType);
}
