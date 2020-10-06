import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    console.log("hi");
    const { data: posts } = await axios.get("api/categories");
    this.setState({ posts });
  }

  handleAdd = async () => {
    const postObj = {
      categoryName: "Arts&Painting",
      categoryDesc: "Arts&Painting",
      active: true,
    };
    //console.log(postObj, "-------------------------------");
    const { data: post } = await axios.post("api/categories", postObj);
    console.log("hi*********************************88", post);
    //add post at the begening of an array
    const posts = [post, ...this.state.posts];
    console.log("hi*********************************88", posts);
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    const postObj = {
      categoryName: "Eductional Workshops",
      categoryDesc: post.categoryDesc,
      active: post.active,
    };
    console.log("Update", post);
    post.title = "UPDATED";
    await axios.put("api/categories" + "/" + post._id, postObj);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    // this.setState({ posts });
    this.setState((prevState) => ({
      cities: [...prevState.posts, posts],
    }));
    this.forceUpdate();
  };

  handleDelete = async (post) => {
    console.log("Delete", post);
    await axios.delete("api/categories" + "/" + post._id);
    const posts = this.state.posts.filter((p) => p._id !== post._id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post._id}>
                <td>{post.categoryName}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
