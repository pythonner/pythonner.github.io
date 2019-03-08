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
    container: '#stats',
    templates: {
        body: '({{nbHits}} document{{#hasManyResults}}s{{/hasManyResults}})',
    },
  })
);

var hitTemplate = `
  <div class="media">
    <div class="media-body">
      <h5>
        {{__hitIndex}}.
        <a href="files/{{file_name}}#{{id}}">
          {{document_title}} - {{title}}
        </a>
      </h5>
      <ol class="document-dates">
        <li>Published: {{pubdate}}</li>
        <li>Effective: {{effdate}}</li>
      </ol>
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
    },
    transformData: {
        item: function(item) {
            item.__hitIndex++;
            return item;
        },
    },
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination justify-content-center',
      active: 'active',
      item: 'page-item',
      link: 'page-link',
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
    container: '#topics',
    attributeName: 'Topic',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#authority',
    attributeName: 'regulatory_authority',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#source-type',
    attributeName: 'source_type',
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
    container: '#applicability',
    attributeName: 'applicability',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#compliance_user',
    attributeName: 'Compliance User',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#content_type',
    attributeName: 'content_type',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#pubdate',
    attributeName: 'pubdate',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#effdate',
    attributeName: 'effdate',
    limit: 5,
    showMore: true,
    cssClasses: refinementClasses,
  })
);

search.start();
