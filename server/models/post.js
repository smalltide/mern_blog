import mongoose from 'mongoose';
import searchPlugin from 'mongoose-search-plugin';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  key: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

postSchema.plugin(searchPlugin, {
  fields: ['title', 'content'],
});

postSchema.statics.searchPost = function searchPost(search, callback) {
  this.search(search.searchText, {}, {
    conditions: { title: { $exists: true }, content: { $exists: true }, key: search.key },
    sort: { title: 1 },
    limit: 50,
  }, callback);
};

const Post = mongoose.model('Post', postSchema);

export default Post;
