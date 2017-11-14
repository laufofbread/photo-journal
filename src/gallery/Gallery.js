import React from 'react';
import firebase, { getDatabaseItems, getFilters } from '../firebase.js';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import GalleryItem from './GalleryItem.js';
import { goToAnchor, goToTop } from 'react-scrollable-anchor';

class Gallery extends React.Component {
  constructor() {
    super();
    this.hash = location.hash;
    this.state = {
      items: [],
      filters: [],
      currentFilter: "all",
      grid: !this.hash.length,
      stateChange: false,
      filteredItems: []
    };
    this.clickItem = this.clickItem.bind(this);
    this.changeView = this.changeView.bind(this);
    this.changeFilter = this.changefilter.bind(this);
    this.filterItems = this.filterItems.bind(this);
  }
  componentDidMount() {
    const dbItemsRef = firebase.database().ref('items');
    dbItemsRef.on('value', (snapshot) => {
      getDatabaseItems(snapshot).then(dbItems => {
        const filters = getFilters(dbItems);
        this.setState({
          items: dbItems,
          filteredItems: dbItems,
          filters: filters });
      });
    });
  };
  clickItem(id) {
    this.setState({ grid: false }, () => {
      goToAnchor(id, true);
    });
  }
  changeView() {
    this.setState({ grid: !this.state.grid});
  }
  changefilter(event) {
    let filteredItems = this.filterItems(event.target.value);
    this.setState({
      currentFilter: event.target.value,
      filteredItems: filteredItems
    });
  }
  filterItems(filter) {
    if(filter != "all") {
      return this.state.items.filter(item => {
        return item.filter === filter;
      });
    } else {
      return this.state.items;
    }
  }
  render () {
    let items = this.state.filteredItems.map(item => {
      let date = format(new Date(item.date), "YYYY-MM-DD");
      let id = `${item.title.replace(/\s+/g, '_')}-${date}`;
      return (
        <GalleryItem key={item.id}
                     item={item}
                     clickItem={this.clickItem}
                     id={id}/>
      )
    });
    let options = this.state.filters.map(filter => {
      return ( <option key={filter} value={filter}>{filter}</option> );
    });
    return (
      <main className="body-wrapper">
        <section className={this.state.grid ? "gallery grid-view" : "gallery full-view"}>
          {items}
        </section>

        <section className="gallery-btns">
          <Link to="upload">+</Link>

          <label>Filter by country:</label>
          <select value={this.state.currentFilter} onChange={this.changeFilter}>
            <option value="all">All</option>
            {options}
          </select>

          <button
            onClick={this.changeView}
            className="btn btn-primary">{this.state.grid ? "List view" : "Grid view"}</button>
        </section>

      </main>
    )
  }
}

export default Gallery;
