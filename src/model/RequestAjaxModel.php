<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractRequestModel;

class RequestAjaxModel extends AbstractRequestModel
{
    public function checkRequest(): ?array
    {
        if ($this->hasphpInput()) {
            return $this->phpInputParam('action', self::DEFAULT_ACTION_AJAX);
        } else {
            return null;
        }
    }
}
