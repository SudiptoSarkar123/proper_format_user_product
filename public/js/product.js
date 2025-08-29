$(document).ready(function() {
    // --- CONFIGURATION ---
    const API_BASE_URL = '/api/v1/products/all'; // IMPORTANT: Change to your actual API endpoint
    const productsPerPage = 12;

    // --- CACHED SELECTORS ---
    const $filtersForm = $('#product-filters');
    const $productList = $('#product-list');
    const $paginationContainer = $('#pagination-container');
    const $loadingIndicator = $('#loading-indicator');
    const $noResultsMessage = $('#no-results');

    // --- FUNCTIONS ---

    /**
     * Fetches products from the API based on current filters and page.
     * @param {number} [page=1] - The page number to fetch.
     */
    function fetchProducts(page = 1) {
        // Collect filter data from the form
        const filterData = $filtersForm.serializeArray().reduce((obj, item) => {
            if (item.value) obj[item.name] = item.value;
            return obj;
        }, {});

        // Add pagination parameters
        filterData.page = page;
        filterData.limit = productsPerPage;

        $.ajax({
            url: API_BASE_URL,
            type: 'GET',
            data: filterData,
            dataType: 'json',
            beforeSend: function() {
                $productList.hide();
                $noResultsMessage.hide();
                $loadingIndicator.show();
            },
            success: function(response) {
                // Assuming the API returns an object like:
                // { products: [], currentPage: 1, totalPages: 5 }
                renderProducts(response.products);
                renderPagination(response.currentPage, response.totalPages);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("AJAX Error:", textStatus, errorThrown);
                $productList.html('<p class="error">Failed to load products. Please try again.</p>').show();
            },
            complete: function() {
                $loadingIndicator.hide();
            }
        });
    }

    /**
     * Renders the product cards into the DOM.
     * @param {Array} products - An array of product objects.
     */
    function renderProducts(products) {
        $productList.empty(); // Clear existing products

        if (!products || products.length === 0) {
            $noResultsMessage.show();
            $productList.hide();
            return;
        }

        $.each(products, function(index, product) {
            const productCard = `
                <div class="product-card">
                    <div class="product-card-img">
                        <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" alt="${product.name}">
                    </div>
                    <div class="product-card-body">
                        <p class="product-category">${product.category}</p>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            $productList.append(productCard);
        });
        $productList.show();
    }

    /**
     * Renders pagination links.
     * @param {number} currentPage - The current active page.
     * @param {number} totalPages - The total number of pages.
     */
    function renderPagination(currentPage, totalPages) {
        $paginationContainer.empty();
        if (totalPages <= 1) return;

        // Previous Button
        let prevDisabled = currentPage === 1 ? 'disabled' : '';
        $paginationContainer.append(`<a href="#" class="page-link ${prevDisabled}" data-page="${currentPage - 1}">Previous</a>`);

        // Page Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            let activeClass = i === currentPage ? 'active' : '';
            $paginationContainer.append(`<a href="#" class="page-link ${activeClass}" data-page="${i}">${i}</a>`);
        }

        // Next Button
        let nextDisabled = currentPage === totalPages ? 'disabled' : '';
        $paginationContainer.append(`<a href="#" class="page-link ${nextDisabled}" data-page="${currentPage + 1}">Next</a>`);
    }

    // --- EVENT HANDLERS ---

    // Handle filter form submission
    $filtersForm.on('submit', function(e) {
        e.preventDefault();
        fetchProducts(1); // Reset to page 1 on new filter search
    });

    // Handle pagination clicks using event delegation
    $paginationContainer.on('click', '.page-link', function(e) {
        e.preventDefault();
        const $this = $(this);
        if ($this.hasClass('disabled') || $this.hasClass('active')) {
            return;
        }
        const page = $this.data('page');
        fetchProducts(page);
    });

    // --- INITIALIZATION ---
    fetchProducts(); // Initial load of products on page ready
});