/* global instantsearch */

var search = instantsearch({
  appId: '95DVATT6CT',
  apiKey: '351c572afbb661b6120c8ec22ccda01e',
  indexName: 'dev_SPIDER',
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate =
  '<div class="hit section">' +
    '<div class="media-content">' +
      '<a href="files/{{basename}}" target="_blank"><h4 class="media-heading">{{h1}}</h4></a>' +
      '<p class="description">{{source}} | {{jurisdiction}} | {{content_type}}</p>'+
      '<p>{{Authority}}</p>'
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }

  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);

// search.addWidget(
//   instantsearch.widgets.rangeSlider({
//     container: '#sizemb',
//     attributeName: 'Size',
//     min: 0,
//     max: 100000,
//     step: 1000,
//     pips: false,
//     tooltips: {format: function(rawValue) {return parseInt(rawValue)}},
//     cssClasses: {
//       body: 'nav-narrow'
//     }
//   })
// );

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#keywords',
    attributeName: 'Keywords',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#topic',
    attributeName: 'Topic',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#authority',
    attributeName: 'authority',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#content-type',
    attributeName: 'content_type',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#jurisdiction',
    attributeName: 'jurisdiction',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#source',
    attributeName: 'source',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#compliance-user',
    attributeName: 'Compliance User',
    limit: 5,
    showMore: true,
    cssClasses: {
      list: 'nav nav-list',
      count: 'badge pull-right',
      active: 'active'
    }
  })
);

search.start();
