$(document).ready(function() {
    let currentPage = 1;
    let filters = {};

    function fetchProducts() {
        const url = 'http://localhost:5000/api/v1/products/all';
        const params = new URLSearchParams(filters);
        params.append('page', currentPage);

        $.ajax({
            url: `${url}?${params.toString()}`,
            type: 'GET',
            success: function(response) {
                renderProducts(response.products);
                renderPagination(response.totalPages);
            },
            error: function(error) {
                console.error('Error fetching products:', error);
            }
        });
    }

    function renderProducts(products) {
        const productList = $('#product-list');
        productList.empty();
        if (products.length === 0) {
            productList.html('<p>No products found.</p>');
            return;
        }
        products.forEach(product => {
            const productCard = `
                <div class="col-md-4">
                    <div class="card product-card">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Price: $${product.price}</p>
                            <p class="card-text">Quantity: ${product.quantity}</p>
                        </div>
                    </div>
                </div>
            `;
            productList.append(productCard);
        });
    }

    function renderPagination(totalPages) {
        const pagination = $('#pagination');
        pagination.empty();
        for (let i = 1; i <= totalPages; i++) {
            const pageItem = `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
            pagination.append(pageItem);
        }
    }

    $('#filter-form').on('submit', function(e) {
        e.preventDefault();
        filters = {
            name: $('#name').val(),
            category: $('#category').val(),
            subCategory: $('#subCategory').val(),
            minPrice: $('#minPrice').val(),
            maxPrice: $('#maxPrice').val(),
            minQuantity: $('#minQuantity').val(),
            maxQuantity: $('#maxQuantity').val()
        };
        // Remove empty filters
        for (const key in filters) {
            if (filters[key] === '') {
                delete filters[key];
            }
        }
        currentPage = 1;
        fetchProducts();
    });

    $('#reset-filters').on('click', function() {
        filters = {};
        $('#filter-form')[0].reset();
        currentPage = 1;
        fetchProducts();
    });

    $(document).on('click', '.page-link', function(e) {
        e.preventDefault();
        currentPage = $(this).data('page');
        fetchProducts();
    });

    // Initial fetch
    fetchProducts();
});