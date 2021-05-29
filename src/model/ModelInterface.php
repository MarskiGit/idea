<?php

declare(strict_types=1);

namespace Idea\model;

interface ModelInterface
{
    public function get(): array;
    public function create(array $requestParam): array;
    public function edit(array $requestParam);
    public function delete(array $requestParam);
    public function search(array $request): array;
}
