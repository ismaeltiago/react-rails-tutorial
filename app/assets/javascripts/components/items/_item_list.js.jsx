class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  onUpdate(item) {
    this.props.onUpdate(item);
  }

  handleEdit(id) {
    this.props.handleEdit(id);
  }

  render() {
    var items= this.props.items.map((item) => {
      return (
        <div key={item.id}>
          <ItemShow item={item}
                handleDelete={this.handleDelete.bind(this, item.id)}
                handleUpdate={this.onUpdate}
                handleEdit={this.handleEdit} />
        </div>
      )
    });

    return(
      <div>
        <h2>List Items</h2>
        <div>
          {items}
        </div>
      </div>
    )
  }
};