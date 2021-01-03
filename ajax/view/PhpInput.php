<?php

declare(strict_types=1);

namespace Ajax\view;

class PhpInput
{
    private ?string $phpInput;

    public function __construct(string $params)
    {
        $this->phpInput = $params;
    }
    public function hasPhpInput(): bool
    {
        return !empty($this->phpInput);
    }
    public function InputParam(): array
    {
        return json_decode($this->phpInput, true);
    }
}
