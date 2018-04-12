class ItemShow extends React.Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(item) {
    this.props.handleEdit(this.props.item.id);
  }

  render() {
    return (
      <div>
        <h3>{this.props.item.name}</h3>
        <p>{this.props.item.description}</p>
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.props.handleDelete} >Delete</button>
      </div>
    )
  }
};
