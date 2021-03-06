Bugtracker::Application.routes.draw do
  root 'home#index'

  scope :api do
    scope :users, as: 'users' do
      post 'login_attempt' => 'sessions#login_attempt'
      get 'logout' => 'sessions#logout'
      get 'current_user' => 'users#get_current_user'
      get 'confirm_email' => 'users#confirm_email'
      get 'statistics' => 'users#statistics'
    end
    resources :users, only: ['index', 'show', 'create'], format: :json

    resources :projects, only: ['index', 'show', 'create', 'update', 'destroy'], format: :json do
      get 'bugs/feed' => 'bugs#feed'
      resources :bugs, only: ['index', 'show', 'create', 'update', 'destroy']
      resources :permissions, only: ['index', 'show', 'create', 'update', 'destroy']
    end
  end

  # resources :projects do
  #   get 'bugs/feed' => 'bugs#feed'
  #   get 'bugs/groups' => 'bugs#groups'
  #   resources :bugs
  #   resources :permissions, only: ['create']
  # end

  # resources :permission_types, only: ['index']

  # get 'login' => 'sessions#login'
  # get 'logout' => 'sessions#logout'
  # post 'login_attempt' => 'sessions#login_attempt'
  # get 'signup' => 'users#new'
  # resources :users, only: ['create', 'index']

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
