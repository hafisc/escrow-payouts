<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\ProjectRepositoryInterface;
use App\Repositories\ProjectRepository;
use App\Services\EscrowLogic;
use App\Services\MidtransService;
use App\Services\AiService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind Repository
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);

        // Bind Services if needed (though they are concrete classes and usually auto-resolvable)
        $this->app->singleton(MidtransService::class, function ($app) {
            return new MidtransService();
        });
        
        $this->app->singleton(AiService::class, function ($app) {
             return new AiService();
        });

        $this->app->scoped(EscrowLogic::class, function ($app) {
             return new EscrowLogic($app->make(MidtransService::class), $app->make(AiService::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
