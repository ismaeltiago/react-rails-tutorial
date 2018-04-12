class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      editItem: {}
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  }

  handleDelete(id) {
    $.ajax({
      url: `/api/v1/items/${id}`,
      type: 'DELETE',
      success:() => {
        this.removeItemClient(id);
      }
    });
  }

  removeItemClient(id) {
    var newItems = this.state.items.filter((item) => {
      return item.id != id;
    });

    this.setState({ items: newItems });
  }

  handleSubmit(item) {
    var items = this.state.items.filter((i) => { return i.id != item.id });
    items.push(item);

    this.setState({
      items: items,
      editItem: {
        id: '',
        name: '',
        description: ''
      }
    });
  }

  handleEdit(id) {
    var item = this.state.items.find(function(item) {
      return item.id === id;
    });

    this.setState({ editItem: item });
  }

  render() {
    return (
      <div>
        <ItemForm handleSubmit={this.handleSubmit} item={this.state.editItem} />
        <ItemList items={this.state.items} handleDelete={this.handleDelete} onUpdate={this.handleUpdate} handleEdit={this.handleEdit} />
      </div>
    )
  }
};
