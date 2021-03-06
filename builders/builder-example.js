(function(rs, utils){

  /**
   * The first parameter is the name of your builder. It
   * should match the name of your builder file. The
   * name is mostly used to prevent a builder from being
   * registered twice but it may be used for more in the
   * future. This name *is not* what is used for the text
   * of the search links.
   *
   * The second parameter is the handler which processes
   * the person data and returns links objects. It does
   * not need to be called createUrl, although there
   * shouldn't be a reason to change it. Read more
   * about this below.
   **/
  rs.registerLinkBuilder({
    text: 'example', 
    func: createUrl
  });

  /**
   * The function which you register as your builder
   * needs to accept one parameter: an object
   * representing a persons information. View the wiki
   * for details on the data format.
   **/
  function createUrl(pd) {    
    
    var url = 'http://myexamplesearchdomain.com/search?';
    var query = '';
    
    /**
     * Here is where you process the objects and build your search url.
     * The utils object passed in at the top of this file contains some
     * utility functions that aid in processing the data.
     *
     * utils.getYear() takes in a date string returns the year.
     */
    
    /**
     * None of the attributes for the person data object are required
     * so we check to see if they exist before using them.
     * 
     * It is usually a good idea to put the query building logic
     * into a function (addQueryParam in this example). It makes 
     * the code a lot cleaner.
     */
    if( pd.givenName ) {
      query = addQueryParam( query, 'first-name', pd.givenName );
    }
    if( pd.familyName ) {
      query = addQueryParam( query, 'last-name', pd.familyName );
    }
    
    /**
     * An object must be returned in the format shown below.
     * It is valid to return a list of objects if for some reason
     * you want multiple links for your site. However, returning
     * links from different sites is discouraged (mostly because
     * I said so, but also because it makes it more difficult to
     * turn off just one of the sites later).
     *
     * The object below will be turned into a link similar to:
     * <a href="http://myexamplesearchdomain.com/searchstuff">My Example</a>
     **/
    return url + query;
  }
  
  function addQueryParam(query, name, value) {
    if( query ) {
      query += '&';
    }
    return query += name + '=' + encodeURIComponent( value );
  }

}(rs, utils));