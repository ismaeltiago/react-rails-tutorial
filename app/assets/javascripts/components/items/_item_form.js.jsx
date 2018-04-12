class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEdit() {
    if(this.state.editable) {
      var name = this.refs.name.value;
      var id = this.props.item.id;
      var description = this.refs.description.value;
      var item = {id: id , name: name , description: description};
      this.props.handleUpdate(item);
    }

    this.setState({ editable: !this.state.editable })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.item.id,
      name: nextProps.item.name,
      description: nextProps.item.description
    })
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    var id = this.state.id || '';
    var name = this.state.name;
    var description = this.state.description;

    event.preventDefault();

    if (!name || !description) {
      return;
    }

    $.ajax({
      url: `/api/v1/items/${id}`,
      type: id ? 'PUT' : 'POST',
      data: { item: { id: id, name: name, description: description } },
      success: (item) => {
        this.props.handleSubmit(item);
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Form Item</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name:</label>
            <input type='text' value={this.state.name || ''} onChange={this.handleChangeName} />
          </div>
          <div>
            <label>Description:</label>
            <input type='text' value={this.state.description || ''} onChange={this.handleChangeDescription} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
};
