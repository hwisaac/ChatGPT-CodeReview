import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
    });
  }

  private generatePrompt = (patch: string) => {
    return `아래는 code patch 입니다. 저에게 간단한 code review를 해주세요. bug risk나 improvement suggestion을 환영합니다:

    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);
    const lang = process.env.LANGUAGE;

    const res = await this.chatAPI.sendMessage(prompt, {
      promptPrefix: 'hi,',
      promptSuffix: `\nlet's start` + (lang ? ', Answer me in ${lang}' : ''),
    });

    console.timeEnd('code-review cost');
    return res.text;
  };
}
