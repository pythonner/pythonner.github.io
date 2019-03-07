/* global instantsearch */

var search = instantsearch({
  appId: '95DVATT6CT',
  apiKey: '351c572afbb661b6120c8ec22ccda01e',
  indexName: 'dev_SPIDER',
  urlSync: {}
});

search.addWidget(
  instantsearch.widgets.searchBox({
    autofocus: true,
    container: '#q',
    placeholder: 'search for documents',
    searchWhileYouType: true,
    showLoadingIndicator: true,
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

var hitTemplate = `
  <div class="media">
    <div class="media-body">
      <div class="row">
        <div class="col">
          <h5>
            <a href="files/{{file_name}}#{{id}}">
              {{h1}} 
            </a>
            <a href="files/{{file_name}}#{{id}}" target="_blank">
              <i class="fa fa-external-link"></i>
            </a>
          </h5>
        </div>
      </div>
      {{source}} {{content_type}} {{jurisdiction}}
      {{#summary}}
      <div class="row">
        <div class="col">
          <p class="summary">
            {{summary}}
          </p>
        </div>
      </div>
      {{/summary}}
      <div class="row">
        <div class="col-8">
          <ul class="list-inline">
            {{#date}}
            <li class="list-inline-item">{{date}}</li>
            {{/date}}
            {{#source}}
            <li class="list-inline-item">{{source}}</li>
            {{/source}}
            {{#jurisdiction}}
            <li class="list-inline-item">{{jurisdiction}}</li>
            {{/jurisdiction}}
            {{#content_type}}
            <li class="list-inline-item">{{content_type}}</li>
            {{/content_type}}
          </ul>
        </div>
        <div class="col-4 text-right">
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="#">
                Download
                <i class="fa fa-download"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                Bookmark
                <i class="fa fa-bookmark"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`;

var noResultsTemplate = `
  <div class="text-center muted">
    No results found matching <strong>{{query}}</strong>.
  </div>
`;

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

var refinementClasses = {
  list: 'filters-list',
  item: 'filters-list-item',
  count: 'badge badge-primary badge-pill ml-1',
  active: 'active'
};

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#keywords',
    attributeName: 'Keywords',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#topic',
    attributeName: 'Topic',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#authority',
    attributeName: 'authority',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#content-type',
    attributeName: 'content_type',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#jurisdiction',
    attributeName: 'jurisdiction',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#source',
    attributeName: 'source',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#compliance-user',
    attributeName: 'Compliance User',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.start();
