if (document.getElementById('q')) {
    /* global instantsearch */

    var search = instantsearch({
      appId: 'PH1RESW6XC',
      apiKey: '53d499dea359bf7e18c269df37553e95',
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

    var iFrameHeight = Math.max(200, Math.round(window.innerHeight * 0.6));
    var hitTemplate = `
      <div class="media">
        <div class="media-body">
          <h5 class="mb-0">
            {{__hitIndex}}.
            <a data-toggle="modal" href="#modal-{{objectID}}">
              {{document_title}}
            </a>
          </h5>
          <ol class="document-dates text-muted pl-2">
            {{#pubdate}}
            <li>Published: {{pubdate}}</li>
            {{/pubdate}}
            {{#effdate}}
            <li>Effective: {{effdate}}</li>
            {{/effdate}}
          </ol>
        </div>
      </div>
      <div class="modal fade" tabindex="-1" role="dialog" id="modal-{{objectID}}" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{document_title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <iframe src="files/{{file_name}}" frameborder="0" height="${iFrameHeight}">
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

    var dateFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };

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
                ['pubdate', 'effdate'].forEach(function(date) {
                   if (item[date] === 'N/A') {
                     item[date] = null;
                   } else if (!!item[date]) {
                     try {
                       var dateObj = new Date(item[date]);
                       item[date] = dateObj.toLocaleDateString('en-US', dateFormatOptions);
                     } catch (err) {
                       item[date] = null;
                     }
                   }
                });
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
        container: '#compliance_user',
        attributeName: 'Compliance User',
        limit: 5,
        showMore: true,
        cssClasses: refinementClasses,
      })
    );

    search.start();
}
