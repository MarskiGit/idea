<?php

declare(strict_types=1);

namespace Idea\model;

use Idea\model\AbstractRequestModel;

class RequestModel extends AbstractRequestModel
{
    public function checkRequest(): ?string
    {
        if (!$this->hasphpInput() && $this->isGet() && !$this->isPost()) {
            return $this->getparam('action', self::DEFAULT_ACTION_HTML);
        } else {
            return null;
        }
    }
}
