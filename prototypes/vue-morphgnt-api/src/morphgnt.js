import axios from 'axios';

export default {
  apiRoot: 'https://api.morphgnt.org',
  async resource(path) {
    const { data: resource } = await axios.get(`${this.apiRoot}${path}`);
    return resource;
  },
  async books() {
    const { books } = await this.resource('/v0/root.json');
    return books;
  },
  async verseLookup(verse) {
    const url = `${this.apiRoot}/v0/verse-lookup/?${verse}`;
    const response = await axios.get(url, { validateStatus: null });
    if (response.status === 400) {
      throw response.data.message;
    } else {
      return response.data.verse_id;
    }
  },
};
