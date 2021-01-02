<?php

declare(strict_types=1);

namespace Idea\controller;

class JavaScriptController extends AbstractController
{
    protected function addIdea(): void
    {
        if ($this->phpInput['table']['action'] === 'read') {
            $this->View->renderJSON($this->TableModel->read($this->phpInput['table']));
        } else {
            switch ($this->phpInput['table']['action']) {
                case 'create':
                    $this->View->renderJSON($this->TableModel->create());
                    break;
                case 'update':
                    $this->View->renderJSON($this->TableModel->update());
                    break;
                case 'delete':
                    $this->View->renderJSON($this->TableModel->delete());
                    break;
                default:
                    $this->View->renderJSON($this->TableModel->read($this->phpInput));
                    break;
            }
        }
    }
    protected function viewIdea(): void
    {
        if ($this->phpInput['view']['action'] === 'read') {
            $this->View->renderJSON($this->TableModel->read($this->phpInput['table']));
        }
    }
}
